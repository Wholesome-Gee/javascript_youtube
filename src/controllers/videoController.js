// 미들웨어 생성
export const homeVideo = (req, res) => res.send("Home Page"); 
export const searchVideo = (req, res) => res.send("Search Video Page");
export const uploadVideo = (req, res) => res.send("Upload Video Page");
export const watchVideo = (req, res) => res.send("Watch Video Page");
export const editVideo = (req, res) => res.send("Edit Video Page");
export const deleteVideo = (req, res) => res.send("Delete Video Page");