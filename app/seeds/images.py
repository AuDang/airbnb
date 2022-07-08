from app.models import db, Image


def seed_images():
   img1 = Image(
      spot_id=1,
      image='https://res.cloudinary.com/dejdhbcrb/image/upload/v1657258115/airbnb/Screenshot_2022-07-07_204857_ssc7mh.png'
   )
   img2 = Image(
      spot_id=1,
      image='https://res.cloudinary.com/dejdhbcrb/image/upload/v1657258114/airbnb/Screenshot_2022-07-07_204931_ol2rov.png'
   )
   img3 = Image(
      spot_id=1,
      image='https://res.cloudinary.com/dejdhbcrb/image/upload/v1657258115/airbnb/Screenshot_2022-07-07_205023_mofved.png'
   )
   img4 = Image(
      spot_id=1,
      image='https://res.cloudinary.com/dejdhbcrb/image/upload/v1657258116/airbnb/Screenshot_2022-07-07_205040_bh5ovi.png'
    )
   img5 = Image(
      spot_id=1,
      image='https://res.cloudinary.com/dejdhbcrb/image/upload/v1657258116/airbnb/Screenshot_2022-07-07_205211_n20ud1.png'
   )
   img6 = Image(
      spot_id=2,
      image='https://res.cloudinary.com/dejdhbcrb/image/upload/v1657258119/airbnb/Screenshot_2022-07-07_205358_mpckmd.png'
   )
   img7 = Image(
      spot_id=2,
      image='https://res.cloudinary.com/dejdhbcrb/image/upload/v1657258116/airbnb/Screenshot_2022-07-07_205429_zknmxg.png'
   )
   img8 = Image(
      spot_id=2,
      image='https://res.cloudinary.com/dejdhbcrb/image/upload/v1657258118/airbnb/Screenshot_2022-07-07_205452_yhkmlw.png'
   )
   img9 = Image(
      spot_id=2,
      image='https://res.cloudinary.com/dejdhbcrb/image/upload/v1657258117/airbnb/Screenshot_2022-07-07_205508_cgrlxx.png'
   )
   img10 = Image(
      spot_id=2,
      image='https://res.cloudinary.com/dejdhbcrb/image/upload/v1657258119/airbnb/Screenshot_2022-07-07_205537_tdaf3n.png'
   )
   img11 = Image(
      spot_id=3,
      image='https://res.cloudinary.com/dejdhbcrb/image/upload/v1657258464/airbnb/Screenshot_2022-07-07_223413_nyq2zn.png'
   )
   img12 = Image(
      spot_id=3,
      image='https://res.cloudinary.com/dejdhbcrb/image/upload/v1657258118/airbnb/Screenshot_2022-07-07_205712_clfgpq.png'
   )
   img13 = Image(
      spot_id=3,
      image='https://res.cloudinary.com/dejdhbcrb/image/upload/v1657258119/airbnb/Screenshot_2022-07-07_205727_k5ebyj.png'
   )
   img14 = Image(
      spot_id=3,
      image='https://res.cloudinary.com/dejdhbcrb/image/upload/v1657258120/airbnb/Screenshot_2022-07-07_205801_mafzdo.png'
   )
   img15 = Image(
      spot_id=3,
      image='https://res.cloudinary.com/dejdhbcrb/image/upload/v1657258119/airbnb/Screenshot_2022-07-07_205830_u9uawk.png'
   )
   img16 = Image(
      spot_id=4,
      image='https://res.cloudinary.com/dejdhbcrb/image/upload/v1657258115/airbnb/Screenshot_2022-07-07_210145_li3nsg.png'
   )
   img17 = Image(
      spot_id=4,
      image='https://res.cloudinary.com/dejdhbcrb/image/upload/v1657258120/airbnb/Screenshot_2022-07-07_210124_e2s943.png'
   )
   img18 = Image(
      spot_id=4,
      image='https://res.cloudinary.com/dejdhbcrb/image/upload/v1657258121/airbnb/Screenshot_2022-07-07_210058_htcfgc.png'
   )
   img19 = Image(
      spot_id=4,
      image='https://res.cloudinary.com/dejdhbcrb/image/upload/v1657258121/airbnb/Screenshot_2022-07-07_210040_wygsgg.png'
   )
   img20 = Image(
      spot_id=4,
      image='https://res.cloudinary.com/dejdhbcrb/image/upload/v1657258120/airbnb/Screenshot_2022-07-07_210023_v3ontr.png'
   )
   img21 = Image(
      spot_id=5,
      image='https://res.cloudinary.com/dejdhbcrb/image/upload/v1657258117/airbnb/Screenshot_2022-07-07_210411_pnh3lr.png'
   )
   img22 = Image(
      spot_id=5,
      image='https://res.cloudinary.com/dejdhbcrb/image/upload/v1657258115/airbnb/Screenshot_2022-07-07_210336_qy1gcd.png'
   )
   img23 = Image(
      spot_id=5,
      image='https://res.cloudinary.com/dejdhbcrb/image/upload/v1657258113/airbnb/Screenshot_2022-07-07_210311_slyvuo.png'
   )
   img24 = Image(
      spot_id=5,
      image='https://res.cloudinary.com/dejdhbcrb/image/upload/v1657258113/airbnb/Screenshot_2022-07-07_210255_h26rar.png'
   )
   img25 = Image(
      spot_id=5,
      image='https://res.cloudinary.com/dejdhbcrb/image/upload/v1657258113/airbnb/Screenshot_2022-07-07_210236_gjfggq.png'
   )

   db.session.add_all([img1, img2, img3, img4, img5])
   db.session.add_all([img6, img7, img8, img9, img10])
   db.session.add_all([img11, img12, img13, img14, img15])
   db.session.add_all([img16, img17, img18, img19, img20])
   db.session.add_all([img21, img22, img23, img24, img25])

   db.session.commit()

def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
