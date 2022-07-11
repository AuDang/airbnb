from app.models import db, Spot

def seed_spots():
   spot1 = Spot(
      user_id=1,
      address='2287 Montauk Hwy',
      city='Bridgehampton',
      state='New York',
      country="United States",
      name='Bridgehampton Gem',
      price=5585,
      description='Music and memories are made at this quintessential shingled Hamptons home. It’s stately but not too serious, with a paneled foyer leading to rooms filled with colorful artwork and concert memorabilia, and a pool in the backyard made for splashing. A private-community setting means it’s a 7-minute drive to great restaurants in Sag Harbor and 10 minutes to antiques and wine in Bridgehampton. Spending your holiday in this villa between two villages makes it easy to pop over to the farmers’ market, waterfront restaurants, and vintage shops in downtown Sag Harbor and the antique shops and art galleries in Bridgehampton. It’s also just a 6-minute drive to the relatively calm waters of Foster Memorial Town Beach. ',
      guest=10,
      bathroom=7,
      bedroom=7
   )
   spot2 = Spot(
      user_id=1,
      address='2244 Noyack Road',
      city='Sag Harbor',
      state='New York',
      country="United States",
      name='Contemporary Waterfront Paradise',
      price=9500,
      description='Lush bursts of greenery bring a serene ambiance to this Sag Harbor property. Flawless views of Mill Creek are visible from the open-concept living space. A pool, sunken into the end of the spacious deck, provides a convenient spot to escape the heat. Seafood eateries, beaches, museums, and nature preserves are minutes away. At sunset, Noyack Bay entices you in for a scenic paddleboard.',
      guest=9,
      bathroom=4,
      bedroom=6
      )
   spot3 = Spot(
      user_id=3,
      address='2040 Sutter St #402',
      city='San Francisco',
      state='California',
      country="United States",
      name='Pacific Heights Gem',
      price=4300,
      description='Opulent yet welcoming, this eclectic home envelops you in a variety of textures, prints, and visually intriguing architecture. A sophisticated design scheme flows throughout with sumptuous furnishings and elegant décor in a creamy and understated golden palette. Just a block from Fillmore Street, one of the city’s great treasures, spend the day perusing luxury boutiques and savoring local cuisine.',
      guest=8,
      bathroom=4,
      bedroom=5
      )
   spot4 = Spot(
      user_id=2,
      address='1019 NE 87th St',
      city='Miami',
      state='Florida',
      country="United States",
      name='Villa Ciana',
      price=4400,
      description='You have the entire house / property for yourself',
      guest=20,
      bathroom=6,
      bedroom=6
      )
   spot5 = Spot(
      user_id=1,
      address='8001 Biscayne Blvd',
      city='Miami',
      state='Florida',
      country="United States",
      name='Villa Limon',
      price=4500,
      description='Hidden beneath a veil of lush foliage, this modern-contemporary oasis resides in the heart of Miami, minutes from the Design District, Wynwood, and downtown core. After a morning workout in the home gym, cool off in the pool. Then, curl up under a shady tree with a good book. Take that special someone out for a stroll along South Beach and audition the dozens of oceanview restaurants at dinner.',
      guest=12,
      bathroom=6,
      bedroom=7
      )

   db.session.add(spot1)
   db.session.add(spot2)
   db.session.add(spot3)
   db.session.add(spot4)
   db.session.add(spot5)

   db.session.commit()


def undo_spots():
   db.session.execute('TRUNCATE spots RESTART IDENTITY CASCADE;')
   db.session.commit()



