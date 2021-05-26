const Harry = {
  id: 1,
  name: 'Harry Potter',
};

export default async (supabase) => {
  await supabase.from('Wizard').upsert([Harry]);

 
  console.log('Database populated !\n');
};
