from app.models import db, Spot

def seed_spots():
   spot1 = Spot(
      host_id=1,
      address='2287 Montauk Hwy',
      city='Bridgehampton',
      state='New York',
      country="United States",
      name='Bridgehampton Gem',
      price=5585,
      description='Music and memories are made at this quintessential shingled Hamptons home.',
      guest=10,
      bathroom=7,
      bedroom=7
   )
   spot2 = Spot(
      host_id=1,
      address='2244 Noyack Road',
      city='Sag Harbor',
      state='New York',
      country="United States",
      name='Contemporary Waterfront Paradise',
      price=9500,
      description='Lush bursts of greenery bring a serene ambiance to this Sag Harbor property. Flawless views of Mill Creek are visible from the open-concept living space.',
      guest=9,
      bathroom=4,
      bedroom=6
      )
   spot3 = Spot(
      host_id=2,
      address='2040 Sutter St #402',
      city='San Francisco',
      state='California',
      country="United States",
      name='Pacific Heights Gem',
      price=4300,
      description='Opulent yet welcoming, this eclectic home envelops you in a variety of textures, prints, and visually intriguing architecture.',
      guest=8,
      bathroom=4,
      bedroom=5
      )
   spot4 = Spot(
      host_id=3,
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
      host_id=2,
      address='8001 Biscayne Blvd',
      city='Miami',
      state='Florida',
      country="United States",
      name='Villa Limon',
      price=4500,
      description='Hidden beneath a veil of lush foliage, this modern oasis resides in the heart of Miami',
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



