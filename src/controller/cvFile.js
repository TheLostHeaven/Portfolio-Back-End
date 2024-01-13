import cvFile from "../Schemas/cvFile.js";
import upload from "../libs/storage.js";

//Create
export const createCV = (req, res) => {
  upload.single('cvPubli')(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    try {

      const newCv = new cvFile({
        cvfile: req.file.filename,
      });
      const cvSave = await newCv.save();

      res.status(201).json({ message: 'CV Guardado con exito' });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  });
};

//Get
export const getCV = async (req, res) => {
  try {
    const cvFile = req.params.cvFile;
    const uploads = path.join(__dirname, 'uploads', );
    res.download(uploads, cvFile);
  }catch (error){
    return res.status(500).json({ msg: error.message})
  }
};

//Delete

export const deleteCVById = async (req, res) => {
  try{
    const {id} = req.params;
    await cvFile.findByIdAndDelete(id);
    res.json({ msg: "CV Eliminado satisfactoriamente"})
  }catch (error){
    return res.status(500).json ({ msg: error.message})
  }
};

