import bcrypt from 'bcrypt';

const generateHashedPassword = async (plainPassword) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  console.log(`Plain: ${plainPassword} | Hashed: ${hashedPassword}`);
};

// generateHashedPassword('password123'); // Replace with your plain password
// generateHashedPassword('password678'); 
// generateHashedPassword('teacher123'); // Replace with your plain password
// generateHashedPassword('teacher456');

generateHashedPassword('password12'); // Replace with your plain password
generateHashedPassword('password34');
generateHashedPassword('password56'); // Replace with your plain password
generateHashedPassword('password78');
generateHashedPassword('password90'); // Replace with your plain password


generateHashedPassword('teacher12'); 
generateHashedPassword('teacher34'); // Replace with your plain password
generateHashedPassword('teacher56');
