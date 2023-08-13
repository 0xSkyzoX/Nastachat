const multer = require("multer");
const upload_router = require("express").Router();
const Post = require("../../database/post");
const User = require("../../database/user");
const secretKey = 'yournightmarecode';
const jwt = require("jsonwebtoken")

const storage = multer.diskStorage({
     destination: (req, file, cb) => {
          cb(null, 'uploads/');
     },
     filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + '-' + file.originalname);
     },
});

const upload = multer({ storage });

upload_router.post("/post_image/:postid", upload.single("image"), async (req, res) => {
     const token = req.headers.authorization.split(" ")[1]
     const file = req.file
     console.log(file)
     try {
          
          const postid = req.params.postid
          if (!postid) {
               return res.status(400), json({ message: "Invalid Post ID" })
          }
          if (!token) {
               return res.status(400).json({ message: "Invalid Token" })
          }
          if (!file) {
               return res.status(400).json({ message: 'No file uploaded' });
          }
          const decoded = jwt.verify(token, secretKey)
          const user = await User.findOne({ email: decoded.email })
          if (user?.email !== decoded.email) {
               return res.status(401).json({ message: "Unauthorized Token" })
          }
          const imagePath = '/uploads/' + file.filename;
          const post = await Post.findOneAndUpdate({ id: postid, "owner.id": user.id }, { img: imagePath })
          if (!post) {
               return res.status(400).json({ message: "Post Not Found" })
          }
          await post.save()
          return res.json({ img: imagePath })

     } catch (err) {
          console.log(err)
     }
})

module.exports = upload_router