const Pet = require('./models/Pet');

const getPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createPet = async (req, res) => {
  const { name, type, age, description } = req.body;

  const pet = new Pet({ name, type, age, description });

  try {
    const newPet = await pet.save();
    res.status(201).json(newPet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });

    pet.name = req.body.name || pet.name;
    pet.type = req.body.type || pet.type;
    pet.age = req.body.age || pet.age;
    pet.description = req.body.description || pet.description;
    pet.adopted = req.body.adopted || pet.adopted;

    const updatedPet = await pet.save();
    res.json(updatedPet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });

    await pet.remove();
    res.json({ message: 'Pet removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getPets, createPet, updatePet, deletePet };
