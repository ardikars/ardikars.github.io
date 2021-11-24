---
title: MariaDB Insert Large Dataset (Java)
date: 2021-11-24 10:41:00 Z
categories:
- java
- mariadb
- largedata
tags:
- database
- mariadb
layout: post
---

```java
EntityManager entityManagerA = entityManagerFactoryA.createEntityManager();
QPayment payment = QPayment.payment;
JPAQueryFactory qf = new JPAQueryFactory(entityManagerA);
JPAQuery<PaymentResponse> query = qf.from(payment)
        .groupBy(payment.refnum)
        .select(
                Projections.bean(
                        PaymentResponse.class,
                        payment.refnum.as(PaymentResponse.PaymentResponse_.REFNUM),
                        payment.idtrx.as(PaymentResponse.PaymentResponse_.IDTRX),
                        payment.jenisTransaksi.as(PaymentResponse.PaymentResponse_.PRODUK),
                        payment.tglbayar.as(PaymentResponse.PaymentResponse_.TANGGAL_BAYAR),
                        payment.rptag.castToNum(Long.class).add(payment.rpadmin.castToNum(Long.class)).sum().stringValue().as(PaymentResponse.PaymentResponse_.AMOUNT)
                )
        ).where(payment.tglbayar.between(from, to).and(payment.kodebank.in(banks)))
        .orderBy(payment.tglbayar.desc());

String start = DateTimes.format(from);
String end = DateTimes.format(to);
String file = System.getProperty("user.dir") + "/" + start + "-" + end + "-" + System.currentTimeMillis() + ".csv";
LocalDateTime now = DateTimes.now();
log.info("Started...");
log.info("Writing to file: {}", file);
final AtomicLong total = new AtomicLong();
try (RandomAccessFile writer = new RandomAccessFile(file, "rw");
     FileChannel channel = writer.getChannel()) {
    final ByteBuffer buff = ByteBuffer.allocate(65535);
    query.stream().forEach(paymentResponse -> {
        buff.clear();
        String line = String.format("%s;%s;%s;%s;%d;%s\n", paymentResponse.getAmount(), DateTimes.format(paymentResponse.getTanggalBayar()), paymentResponse.getIdtrx(), paymentResponse.getProduk(), pullPlnId, paymentResponse.getRefnum());
        buff.put(line.getBytes(StandardCharsets.UTF_8));
        buff.flip();
        try {
            channel.write(buff);
            total.incrementAndGet();
        } catch (IOException e) {
            // do something
        }
    });
} catch (FileNotFoundException e) {
    // do something
} catch (IOException e) {
    // do something
} finally {
    entityManagerA.close();
}

EntityManager entityManagerB = entityManagerFactoryB.createEntityManager();

Session session = entityManagerB.unwrap(Session.class);
session.doWork(connection -> {
    String baQuery = "LOAD DATA LOCAL INFILE ? INTO TABLE my_dst_table FIELDS TERMINATED BY ';' LINES TERMINATED BY '\n'";
    PreparedStatement preparedStatement = connection.prepareStatement(baQuery);
    preparedStatement.setString(1, file);
    boolean execute = preparedStatement.execute();
    System.out.println("EXECUTED: " + execute);
});
long between = ChronoUnit.MINUTES.between(now, DateTimes.now());
log.info("Done: takes {} minutes.", between);
entityManagerB.close();
```

*) Inserting more then 400k data takes less the a minutes.

Refs:

https://mariadb.com/kb/en/how-to-quickly-insert-data-into-mariadb/

https://mariadb.com/kb/en/load-data-infile/
