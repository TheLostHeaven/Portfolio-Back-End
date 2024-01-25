import ImgFile from "../Schemas/Img.js"
import upload from "../libs/storage.js"
import fs from 'fs';
import path from 'path';

//Create
export const createImg = (req, res) => {
  upload.single('imgPubli')(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    try {

      const newImg = new ImgFile({
        imgId: req.file.filename,
        imgfile: req.file.filename,
      });
      const ImgSaved = await newImg.save();

      res.status(201).json({ message: 'Imagen guardada con éxito' });
      console.log(req.file)
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  });
};

//Get
// export const getImg = async (req, res) => {
//   try {
//     const Imgs = await ImgFile.find({});
//     res.sendFile(`/src/public/uploads/${Imgs.imgfile}`);
//     return res.json(Imgs)
//   }catch (error){
//     return res.status(500).json({ msg: error.message})
//   }

// }

// Ruta para obtener imágenes
export const getImg = async (req, res) => {
  try {
    // Verificar si se proporciona un ID en los parámetros de la solicitud
    const { id } = req.params;

    if (id) {
      // Si hay un ID, buscar y devolver la imagen por ID
      const img = await ImgFile.findById(id);

      if (!img) {
        return res.status(404).json({ msg: 'Imagen no encontrada' });
      }

      // Obtener la ruta completa al archivo de imagen
      const imagePath = path.join('/src/public/uploads/', img.imgfile);

      // Verificar si el archivo de imagen existe
      if (fs.existsSync(imagePath)) {
        // Enviar la imagen como respuesta
        res.sendFile(imagePath);
      } else {
        return res.status(404).json({ msg: 'Archivo de imagen no encontrado' });
      }
    } else {
      // Si no hay ID, devolver todas las imágenes
      const Imgs = await ImgFile.find({});
      const imagesWithPath = Imgs.map(img => ({
        ...img._doc,
        imgPath: path.join('/src/public/uploads/', img.imgfile)
      }));

      return res.json(imagesWithPath);
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//GetId
export const getImgById = async (req, res) => {
  try{
    const {id} = req.params;
    const Imgs = await ImgFile.findById(id);
    res.sendFile(`/src/public/uploads/${Imgs.imgfile}`);
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


