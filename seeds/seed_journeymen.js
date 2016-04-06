
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('journeymen').del(),

    // Inserts seed entries
    knex('journeymen').insert({           
                                soundcloud_id: 12345, 
                                   first_name: 'John', 
    	                            last_name: 'Doe', 
                                        email: 'email@email.com',
    	                           instrument: '[1]',
                                  description: 'about me'
                           }),
    
    knex('journeymen').insert({          
                                soundcloud_id: 12346, 
                                   first_name: 'Frankie', 
                                    last_name: 'Vithayathil', 
                                        email: 'email@gmail.com',
                                   instrument: '[1,2,3]', 
                                  description: 'about me'
                            }),
    
    knex('journeymen').insert({         
                                soundcloud_id: 12347, 
                                   first_name: 'Feben', 
                                    last_name: 'Austin', 
                                        email: 'email@hmail.com',
                                   instrument: '[1]', 
                                  description: 'about me'
                            })
  )
};
