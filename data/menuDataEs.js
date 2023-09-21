export default [
  {
    title: 'the Menu',
    slug: 'the-menu',
    cover:
      'https://res.cloudinary.com/rafamed-dev/image/upload/v1674092920/menu/IMG_0327_wehtnc.jpg',
    sections: [
      {
        title: 'Entradas',
        description: '',
        cover:
          'https://images.pexels.com/photos/2814828/pexels-photo-2814828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Queso fundido Brunette',
            description: 'Queso fundido con chicharrón prensado',
            price: '$185.00',
          },
          {
            name: 'Mini hamburguesas',
            description: 'Carne selecta en pan untado con rico aderezo de la casa',
            price: '$195.00',
          },
          {
            name: 'Nachos real',
            description:
              'Totopo bañado en salsa de queso, aguacate y coronado con camarones salteados',
            price: '$195.00',
          },
          {
            name: 'Nacho sencillo',
            description: '',
            price: '$145.00',
          },
          {
            name: 'Elote pop',
            description: 'Elote con mantequilla, queso y aderezo de la casa',
            price: '$85.00',
          },
          {
            name: 'Alitas',
            description: 'Buffalo / BBQ',
            price: '',

            variants: [
              {
                id: 1,
                name: '10pz',
                price: '$175',
              },
              {
                id: 2,
                name: '20pz',
                price: '$315',
              },
            ],
          },
          {
            name: 'Boneless',
            description: 'Buffalo / BBQ',
            price: '',
            variants: [
              {
                id: 1,
                name: '10pz',
                price: '$185',
              },
              {
                id: 2,
                name: '20pz',
                price: '$325',
              },
            ],
          },
          {
            name: 'Guacamole',
            description: '',
            price: '$145.00',
          },

          {
            name: 'Tabla Brunette',
            description:
              'Mini hamburguesas,boneless, alitas, nachos con queso, quesadillas, papas a la francesa, guacamole',
            price: '$610.00',
          },
        ],
      },
      {
        title: 'Sopas y ensaladas',
        description: '',
        cover:
          'https://images.pexels.com/photos/9928322/pexels-photo-9928322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Sopa de tortilla',
            description: 'Tortilla frita, aguacate, queso, crema y chile ancho',
            price: '$155.00',
          },
          {
            name: 'Ensalada del bosque',
            description: 'Lechugas mixtas, nuez garapiñada, queso feta, frutos rojos y manzana',
            price: '$185.00 ',
          },
          {
            name: 'Crema de elote rostizado',
            description: '',
            price: '$165.00',
          },
          {
            name: 'Ensalada César',
            description: '',
            price: '$185.00',
          },
        ],
      },
      {
        title: 'Especialidad de la casa',
        description: '',
        cover:
          'https://images.pexels.com/photos/9928322/pexels-photo-9928322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Chile bonita',
            description: 'Chile poblano relleno de chilaquiles rojos',
            price: '$175.00',
          },
          {
            name: 'Tour real',
            description:
              'Pechuga de pollo a la parmesana, pure de papa, speguetti a la mantequilla y ensalada del bosque',
            price: '$295.00',
          },
          {
            name: 'Tabla de quesos',
            description: '',
            price: '$485.00',
          },
        ],
      },
      {
        title: 'Pastas',
        description: '',
        cover:
          'https://images.pexels.com/photos/5175537/pexels-photo-5175537.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Fetuccini Alfredo',
            description: 'Servido con cremosa salsa alfredo',
            price: '$185.00',
            variants: ['Con pollo $240.00', 'Con camarón $275.00'],
          },
          {
            name: 'Lasagna Brunette',
            description: 'Lasagna de res a la bolognesa ',
            price: '$235.00',
          },
          {
            name: 'Penne en crema de chipotle',
            description: 'Con pechuga a la plancha y almendra tostada',
            price: '$245.00',
          },
        ],
      },
      {
        title: 'Mariscos',
        description: '',
        cover:
          'https://images.pexels.com/photos/2827263/pexels-photo-2827263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Volcán de pescado al pastor',
            description: 'Pescado al pastor, cilantro, cebolla y aguacate',
            price: '$175.00',
          },
          {
            name: 'ceviche de pescado Brunette',
            description: '',
            price: '$195.00',
          },
          {
            name: 'aguachile Brunette',
            description: '',
            price: '$235.00',
          },
          {
            name: 'Atun Brunette',
            description: 'lajas de atún en salsas negras',
            price: '$285.00',
          },
        ],
      },
      {
        title: 'Carnes',
        description: '',
        cover:
          'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Costillas BBQ',
            description: 'Costillas, elote y papas a la francesa',
            price: '$365.00',
          },
          {
            name: 'Arrachera de la casa (250gr)',
            description: 'Arrachera, frijol de la chef, guacamole, cebolla y chile asado',
            price: '$355.00',
          },

          {
            name: 'Asado Brunette',
            description:
              'Pechuga de pollo, carne asada, chorizo asado, chiles con tocino y queso, guacamole, frijoles, salsa',
            price: '$490.00',
          },
          {
            name: 'Ribeye (400gr)',
            description: 'Acompañado de chimichurri, puré de papa y vegetales',
            price: '$585.00',
          },
        ],
      },

      {
        title: 'Pollo',
        description: '',
        cover:
          'https://images.pexels.com/photos/2741458/pexels-photo-2741458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Pollo a la plancha',
            description: 'Con puré de papa y vegetales',
            price: '$265.00',
          },
          {
            name: 'Pechuga rellena',
            description: 'Rellena de jamon y queso, con pasta a la mantequilla y vegetales',
            price: '$285.00',
          },

          {
            name: 'Pechuga rellena de mouse de camarón',
            description:
              'Rellena de mouse de camarón, banada en crema de chipotle con puré de papa y atado de verduras',
            price: '$295.00',
          },
        ],
      },
      {
        title: 'Pizzas',
        description: '',
        cover:
          'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Peperoni',
            description: '',
            price: '$180.00',
          },
          {
            name: 'Mexicana',
            description: '',
            price: '$195.00',
          },
          {
            name: 'Margarita',
            description: 'Queso, pesto, tomates y albahaca',
            price: '$185.00',
          },

          {
            name: 'Mar y tierra',
            description: 'Arrachera y camarón',
            price: '$235.00',
          },
          {
            name: 'Taquera',
            description: 'Carne asada y carne al pastor',
            price: '$235.00',
          },
          {
            name: '',
            description: '*Orilla de queso',
            price: '$60.00',
          },
        ],
      },
      {
        title: 'Postres',
        description: '',
        cover:
          'https://images.pexels.com/photos/3992131/pexels-photo-3992131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Helado de buñuelos',
            description: '',
            price: '$145.00',
          },

          {
            name: 'Flan de guayaba',
            description: 'Con compota de guayaba y chile morita',
            price: '$155.00',
          },
          {
            name: 'Pie de manzana',
            description: 'Servido caliente acompañado de helado de vainilla',
            price: '$155.00',
          },
        ],
      },
    ],
  },

  {
    title: 'Desayunos',
    slug: 'desayunos',
    cover:
      'https://res.cloudinary.com/rafamed-dev/image/upload/v1675884394/menu/desayunos_qawxqt.jpg',
    sections: [
      {
        title: 'Detox',
        description: '',
        cover:
          'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Jugo Naranja',
            description: '',
            price: '$75.00',
          },
          {
            name: 'Jugo Verde',
            description: '',
            price: '$75.00',
          },
          {
            name: 'Smoothie Frutos Rojos',
            description: '',
            price: '$90.00',
          },

          {
            name: 'Pancakes de Avena',
            description: 'Acompañado de fruta de temporada',
            price: '$165.00',
          },
        ],
      },
      {
        title: 'Huevos',
        description: '',
        cover:
          'https://images.pexels.com/photos/588776/pexels-photo-588776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Huevos al gusto',
            description: 'Chorizo, jamón, tocino',
            price: '$165.00',
          },
          {
            name: 'Huevos rancheros',
            description: '',
            price: '$175.00',
          },
        ],
      },
      {
        title: 'Omelette',
        description: '',
        cover:
          'https://images.pexels.com/photos/6529924/pexels-photo-6529924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Vegetariano',
            description: '',
            price: '$175.00',
          },
          {
            name: 'Mar y tierra',
            description: '',
            price: '$205.00',
          },
          {
            name: 'El chilaquil',
            description: 'Rellenos de chilaquiles de mole poblano',
            price: '$185.00',
          },
          {
            name: 'La chicharronera',
            description: 'Relleno de chicharron prensado en salsa roja',
            price: '$195.00',
          },
          {
            name: 'Omelette de la casa',
            description: 'Chile relleno de queso, bañado en salsa de tomate',
            price: '$185.00',
          },
        ],
      },
      {
        title: 'Chilaquiles',
        description: '',
        cover:
          'https://images.pexels.com/photos/10305696/pexels-photo-10305696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Rojos, verdes, Mole, Chipotle',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Sencillos',
                price: '$155.00',
              },
              {
                id: 2,
                name: 'Con huevo',
                price: '$175.00',
              },
              {
                id: 3,
                name: 'Con pollo',
                price: '$195.00',
              },
            ],
          },
        ],
      },

      {
        title: 'Los clásicos',
        description: '',
        cover:
          'https://images.pexels.com/photos/7116796/pexels-photo-7116796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Pancakes (3)',
            description: '',
            price: '$165.00',
          },
          {
            name: 'Pancakes zanahoria (3)',
            description: '',
            price: '$195.00',
          },
          {
            name: 'Pan frances',
            description: '',
            price: '$185.00',
          },

          {
            name: 'Tabla Arilu',
            description: '6 pz de pancakes, 6 pz waffles y tiras de tocino, para compartir',
            price: '$385.00',
          },
        ],
      },
      {
        title: 'Especiales Brunette',
        description: '',
        cover:
          'https://images.pexels.com/photos/2662875/pexels-photo-2662875.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Arrachera Brunette',
            description: '230gr de arrachera, 2 huevos, papas de la casa y chilaquiles',
            price: '$285.00',
          },
          {
            name: 'El del ingeniero',
            description:
              'Carne asada, 2 huevos, chilaquiles, frijol, guacamole, queso asado y quesadilla',
            price: '$265.00',
          },

          {
            name: 'Don Luis',
            description: 'Huevos, tocino, jamón, papa rallada, y pancakes',
            price: '$245.00',
          },
        ],
      },
    ],
  },

  {
    title: 'the Bar',
    slug: 'the-bar',
    cover:
      'https://res.cloudinary.com/rafamed-dev/image/upload/v1695338606/menu/WhatsApp_Image_2023-09-21_at_10.02.54_AM_jl8bzk.jpg',
    sections: [
      {
        title: 'Vinos Casa Magoni',
        description: '',
        cover:
          'https://images.pexels.com/photos/66636/pexels-photo-66636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Chardonay-Vermentino',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$520.00',
              },
            ],
          },
          {
            name: 'Manaz-fiano Viogner 2021',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$520.00',
              },
            ],
          },
          {
            name: 'Sauvig Blanc 2021',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$540.00',
              },
            ],
          },
          {
            name: 'Origen 43 2020',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$660.00',
              },
            ],
          },
          {
            name: 'Rose 2021',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$525.00',
              },
            ],
          },
          {
            name: 'Sangiovese-cabernet 2021',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$550.00',
              },
            ],
          },
          {
            name: 'Merlot Malbec 2020',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$600.00',
              },
            ],
          },

          {
            name: 'Nebbiolo de baja 2019',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$750.00',
              },
            ],
          },
        ],
      },
      {
        title: 'Vinos L.A. Cetto',
        description: '',
        cover:
          'https://images.pexels.com/photos/1494410/pexels-photo-1494410.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Chenin Black',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$430.00',
              },
            ],
          },
          {
            name: 'Petite Sirah',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$430.00',
              },
            ],
          },
          {
            name: 'Cabernet Sauvignon',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$450.00',
              },
            ],
          },
          {
            name: 'Zinfandel',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$450.00',
              },
            ],
          },

          {
            name: 'Merlot',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$450.00',
              },
            ],
          },

          {
            name: 'Nebiolo',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$590.00',
              },
            ],
          },
        ],
      },
      {
        title: 'Otros vinos',
        description: '',
        cover:
          'https://images.pexels.com/photos/1494410/pexels-photo-1494410.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Sangre de Cristo',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$450.00',
              },
            ],
          },
        ],
      },
      {
        title: 'Tequila',
        description: '',
        cover:
          'https://images.pexels.com/photos/5791650/pexels-photo-5791650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Don Julio 1942 750ml',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$5,700.00',
              },
              {
                id: 2,
                name: 'Shot',
                price: '$360.00',
              },
            ],
          },
          {
            name: 'Don Julio 70 Anejo Cristalino 700ml',
            description: '',
            price: '',

            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$2,200.00',
              },
              {
                id: 2,
                name: 'Shot',
                price: '$145.00',
              },
            ],
          },
          {
            name: 'Don Julio Blanco 700ml',
            description: '',
            price: '',

            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$1,500.00',
              },
              {
                id: 2,
                name: 'Shot',
                price: '$110.00',
              },
            ],
          },
          {
            name: 'Don Julio Reposado 700ml',
            description: '',
            price: '',

            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$1,650.00',
              },
              {
                id: 2,
                name: 'Shot',
                price: '$120.00',
              },
            ],
          },
          {
            name: '1800 Cristalino',
            description: '',
            price: '',

            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$1,800.00',
              },
              {
                id: 2,
                name: 'Shot',
                price: '$130.00',
              },
            ],
          },

          {
            name: 'Patron Reposado 750ml',
            description: '',
            price: '',

            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$1,400.00',
              },
              {
                id: 2,
                name: 'Shot',
                price: '$115.00',
              },
            ],
          },

          {
            name: 'Maestro Dobel',
            description: '',
            price: '',

            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$1,650.00',
              },
              {
                id: 2,
                name: 'Shot',
                price: '$130.00',
              },
            ],
          },

          {
            name: 'Patron Silver 750ml',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$1,300.00',
              },
              {
                id: 2,
                name: 'Shot',
                price: '$110.00',
              },
            ],
          },
        ],
      },
      {
        title: 'Vodka',
        description: '',
        cover:
          'https://images.pexels.com/photos/209590/pexels-photo-209590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Smirnoff 750ml',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$600.00',
              },
              {
                id: 2,
                name: 'Trago',
                price: '$95.00',
              },
            ],
          },
          {
            name: 'Stolichnaya',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$650.00',
              },
              {
                id: 2,
                name: 'Trago',
                price: '$140.00',
              },
            ],
          },
          {
            name: 'Absolut Azul 750ml',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$700.00',
              },
              {
                id: 2,
                name: 'Trago',
                price: '$110.00',
              },
            ],
          },

          {
            name: 'Grey Goose',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$1,600.00',
              },
              {
                id: 2,
                name: 'Trago',
                price: '$140.00',
              },
            ],
          },
        ],
      },
      {
        title: 'Mezcal',
        description: '',
        cover:
          'https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Gusano Rojo',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$950.00',
              },
              {
                id: 2,
                name: 'Trago',
                price: '$110.00',
              },
            ],
          },
          {
            name: '400 Conejos Joven',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$1,600.00',
              },
              {
                id: 2,
                name: 'Trago',
                price: '$120.00',
              },
            ],
          },
          {
            name: 'Amaras',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$1,500.00',
              },
              {
                id: 2,
                name: 'Trago',
                price: '$135.00',
              },
            ],
          },
          {
            name: 'Monte Lobo',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$1,600.00',
              },
              {
                id: 2,
                name: 'Trago',
                price: '$140.00',
              },
            ],
          },
        ],
      },
      {
        title: 'Ginebra',
        description: '',
        cover:
          'https://images.pexels.com/photos/613182/pexels-photo-613182.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Bombay',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$1,200.00',
              },
              {
                id: 2,
                name: 'Trago',
                price: '$135.00',
              },
            ],
          },
          {
            name: 'Tanqueray',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$1,200.00',
              },
              {
                id: 2,
                name: 'Trago',
                price: '$135.00',
              },
            ],
          },
          {
            name: 'Hendrix',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$1,800.00',
              },
              {
                id: 2,
                name: 'Trago',
                price: '$165.00',
              },
            ],
          },
        ],
      },
      {
        title: 'Champagne',
        description: '',
        cover:
          'https://images.pexels.com/photos/5379876/pexels-photo-5379876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'CH Moet Brut 750ml',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$2,250.00',
              },
            ],
          },
          {
            name: 'CH Moet Ice 750ml',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$2,950.00',
              },
            ],
          },
        ],
      },

      {
        title: 'Cognac',
        description: '',
        cover:
          'https://images.pexels.com/photos/5947025/pexels-photo-5947025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Henessy',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$1,700.00',
              },
              {
                id: 2,
                name: 'Trago',
                price: '$195.00',
              },
            ],
          },
          {
            name: 'Martell VSOP',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$1,900.00',
              },
              {
                id: 2,
                name: 'Trago',
                price: '$170.00',
              },
            ],
          },
          {
            name: 'Remy Martin',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$2,200.00',
              },
              {
                id: 2,
                name: 'Trago',
                price: '$150.00',
              },
            ],
          },
        ],
      },

      {
        title: 'Whisky',
        description: '',
        cover:
          'https://images.pexels.com/photos/6638905/pexels-photo-6638905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Johnnie Walker Red Label',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$950.00',
              },
              {
                id: 2,
                name: 'Trago',
                price: '$110.00',
              },
            ],
          },
          {
            name: 'Jack Daniels',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$1,200.00',
              },
              {
                id: 2,
                name: 'Trago',
                price: '$120.00',
              },
            ],
          },
          {
            name: 'Chivas Regal',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$1,600.00',
              },
              {
                id: 2,
                name: 'Trago',
                price: '$135.00',
              },
            ],
          },
          {
            name: 'Buchanans 12Y Deluxe 750ml',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$1,900.00',
              },
              {
                id: 2,
                name: 'Trago',
                price: '$150.00',
              },
            ],
          },
          {
            name: 'Johnnie Walker Black Label',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$2,000.00',
              },
              {
                id: 2,
                name: 'Trago',
                price: '$150.00',
              },
            ],
          },
          {
            name: 'Macallan 12',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$2,900.00',
              },
              {
                id: 2,
                name: 'Trago',
                price: '$195.00',
              },
            ],
          },

          {
            name: 'Buchanans 18Y 750ml',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$3,450.00',
              },
              {
                id: 2,
                name: 'Trago',
                price: '$245.00',
              },
            ],
          },
        ],
      },

      {
        title: 'Ron',
        description: '',
        cover:
          'https://images.pexels.com/photos/2360578/pexels-photo-2360578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Captain Morgan',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$600.00',
              },
              {
                id: 2,
                name: 'Trago',
                price: '$90.00',
              },
            ],
          },
          {
            name: 'Bacardi Blanco',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$650.00',
              },
              {
                id: 2,
                name: 'Trago',
                price: '$90.00',
              },
            ],
          },

          {
            name: 'Zacapa Solera',
            description: '',
            price: '',
            variants: [
              {
                id: 1,
                name: 'Botella',
                price: '$2,100.00',
              },
              {
                id: 2,
                name: 'Trago',
                price: '$145.00',
              },
            ],
          },
        ],
      },
      {
        title: 'Drinks',
        description: '',
        cover:
          'https://images.pexels.com/photos/110472/pexels-photo-110472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Cantarito',
            description: '',
            price: '$145.00',
          },
          {
            name: 'Martini',
            description: '',
            price: '$120.00',
          },
          {
            name: 'Martini sucio',
            description: '',
            price: '$195.00',
          },
          {
            name: 'Martini seco',
            description: '',
            price: '$195.00',
          },
          {
            name: 'Goodbye mother fucker',
            description: '',
            price: '$150.00',
          },
          {
            name: 'Margarita',
            description: '',
            price: '$120.00',
          },
          {
            name: 'Paloma',
            description: '',
            price: '$120.00',
          },
          {
            name: 'Tequila sunrise',
            description: '',
            price: '$135.00',
          },
          {
            name: 'Long island',
            description: '',
            price: '$150.00',
          },
          {
            name: 'Cuba',
            description: '',
            price: '$110.00',
          },
          {
            name: 'Sangría preparada',
            description: '',
            price: '$120.00',
          },
          {
            name: 'Piña colada',
            description: '',
            price: '$120.00',
          },
          {
            name: 'Mimosas',
            description: '',
            price: '$110.00',
          },
          {
            name: 'Sex on the beach',
            description: '',
            price: '$135.00',
          },

          {
            name: 'Mojito',
            description: '',
            price: '$130.00',
          },

          {
            name: 'Sangría especial',
            description: '',
            price: '$160.00',
          },
        ],
      },
      {
        title: 'Digestivos',
        description: '',
        cover: 'https://images.pexels.com/photos/4664307/pexels-photo-4664307.jpeg',
        items: [
          {
            name: 'Jagermeister',
            description: '',
            price: '$95.00',
          },
          {
            name: 'Baileys irish cream',
            description: '',
            price: '$95.00',
          },
          {
            name: 'Kahlúa',
            description: '',
            price: '$95.00',
          },
          {
            name: 'Frangelico',
            description: '',
            price: '$95.00',
          },
          {
            name: 'Carajillo',
            description: '',
            price: '$150.00',
          },
        ],
      },
      {
        title: 'Cerveza Tecate',
        description: '',
        cover:
          'https://images.pexels.com/photos/667986/pexels-photo-667986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Tecate',
            description: '',
            price: '$60.00',
          },
          {
            name: 'Tecate light',
            description: '',
            price: '$60.00',
          },

          {
            name: 'Indio',
            description: '',
            price: '$60.00',
          },

          {
            name: 'XX Lager',
            description: '',
            price: '$60.00',
          },

          {
            name: 'Ultra Amstel',
            description: '',
            price: '$65.00',
          },
        ],
      },
      {
        title: 'Cerveza Corona',
        description: '',
        cover:
          'https://images.pexels.com/photos/667986/pexels-photo-667986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Corona',
            description: '',
            price: '$50.00',
          },
          {
            name: 'Victoria',
            description: '',
            price: '$50.00',
          },
          {
            name: 'Modelo clara',
            description: '',
            price: '$65.00',
          },

          {
            name: 'Modelo oscura',
            description: '',
            price: '$65.00',
          },

          {
            name: 'Michelob Ultra',
            description: '',
            price: '$65.00',
          },
        ],
      },

      {
        title: 'extras',
        description: '',
        cover:
          'https://images.pexels.com/photos/4109907/pexels-photo-4109907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Vaso michelado',
            description: '',
            price: '$40.00',
          },
          {
            name: 'Vaso cubano',
            description: '',
            price: '$40.00',
          },
          {
            name: 'Vaso chabela',
            description: '',
            price: '$40.00',
          },
          {
            name: 'aceitunas',
            description: '',
            price: '$85.00',
          },
          {
            name: 'Cacahuates',
            description: '',
            price: '$65.00',
          },
          {
            name: 'Botana brunette',
            description: '',
            price: '$115.00',
          },
        ],
      },

      {
        title: 'No alcohol',
        description: '',
        cover:
          'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Clamato sin alcohol',
            description: '',
            price: '$80.00',
          },
          {
            name: 'Piñada',
            description: '',
            price: '$80.00',
          },
          {
            name: 'Sodas',
            description: '',
            price: '$50.00',
          },
          {
            name: 'Agua mineral Ciel',
            description: '',
            price: '$35.00',
          },
          {
            name: 'Agua mineral Topo Chico',
            description: '',
            price: '$60.00',
          },
          {
            name: 'Chocomilk',
            description: '',
            price: '$55.00',
          },
          {
            name: 'Café',
            description: '',
            price: '$55.00',
          },
          {
            name: 'Vaso de leche',
            description: '',
            price: '$40.00',
          },
          {
            name: 'Malteada de vainilla',
            description: '',
            price: '$75.00',
          },

          {
            name: 'Naranjada - Limonada',
            description: '',
            price: '$55.00',
          },
          {
            name: 'Jarra de Naranjada',
            description: '',
            price: '$220.00',
          },

          {
            name: 'Botella de agua',
            description: '',
            price: '$35.00',
          },
        ],
      },
    ],
  },

  {
    title: 'Mixología',
    slug: 'mixologia',
    cover:
      'https://res.cloudinary.com/rafamed-dev/image/upload/v1674092841/menu/IMG_0394_jnbkt4.jpg',
    sections: [
      {
        title: 'Menú Brunette',
        description: '',
        cover:
          'https://images.pexels.com/photos/12336029/pexels-photo-12336029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        items: [
          {
            name: 'Candela',
            description: 'Mezcal, conserva de jamaica y maracuyá, limón y sal de chiles ahumados.',
            price: '$210.00',
          },
          {
            name: 'Eros',
            description: 'Gin, compota de frutos rojos, limón, tonic top & soda.',
            price: '$210.00',
          },
          {
            name: "Piña pa'la niña ",
            description:
              'Ron blanco, pera piña, jugo de piña, Angostura, crema batida y coco tostado..',
            price: '$210.00',
          },
          // {
          //   name: 'Kukulkán',
          //   description:
          //     'Tequila, licor de naranja, miel de agave, piña asada, rodajas de pepino, 1 Hoja santa tatemada. Decorado con hojas de piña',
          //   price: '$210.00 ',
          // },
          {
            name: 'Brunette & Tonic',
            description: 'Gin, lemon grass, limón amarillo, menta, tonic y perfume de Damiana.',
            price: '$210.00 ',
          },
          // {
          //   name: 'Mula arriera',
          //   description:
          //     'Mezcal joven espadín, Sal artesanal de chiles ahumados, pulpa de tamarindo natural, menta fresca, bitter artesanal de naranja y toronja, jugos cítricos, top de cerveza de jengibre, conserva de piña y apio. Decorado con menta fresca coral comestible y caramelos de jengibre coreano',
          //   price: '$210.00 ',
          // },
          {
            name: 'El matador',
            description: 'Mezcal, jugo de cítricos, piña, albahaca y miel de agave.',
            price: '$210.00 ',
          },
        ],
      },
    ],
  },
];
