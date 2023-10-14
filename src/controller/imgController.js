import ImgFile from "../Schemas/Img.js"
import upload from "../libs/storage.js"

//Create
export const createImg = (req, res) => {
  upload.single('imgPubli')(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    try {

      const newImg = new ImgFile({
        imgfile: req.file.filename,
      });
      const ImgSaved = await newImg.save();

      res.status(201).json({ message: 'Imagen guardada con éxito' });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  });
};

//Get
export const getImg = async (req, res) => {
  try {
    const Imgs = await ImgFile.find({});
    return res.json(Imgs)
  }catch (error){
    return res.status(500).json({ msg: error.message})
  }
};

//GetId
export const getImgById = async (req, res) => {
  try{
    const {id} = req.params;
    const Imgs = await ImgFile.findById(id);
    res.status(200).json(Imgs)
  }catch (error){
    return res.status(500).json({ msg: error.message})
  }
};

//Delete

export const deleteImgById = async (req, res) => {
  try{
    const {id} = req.params;
    await ImgFile.findByIdAndDelete(id);
    res.json({ msg: "Publication Delete"})
  }catch (error){
    return res.status(500).json ({ msg: error.message})
  }
};


