// 미들웨어 생성
export const homeVideo = (req, res) => {
  const fakeUser = { username:'gee' }
  const videos = [
    { 
      title:'Video1', 
      rating: 5, 
      comments: 2, 
      createdAt: "2 minutes ago", 
      views: 59, 
      id: 1 
    },
  ]
  res.render('home',{ pageTitle: 'Home', videos, fakeUser });
}
export const searchVideo = (req, res) => res.render('search',{ pageTitle: 'Search' });
export const uploadVideo = (req, res) => res.render('upload',{ pageTitle: 'Upload' });
export const watchVideo = (req, res) => res.render('watch',{ pageTitle: 'Watch' });
export const editVideo = (req, res) => res.render('edit',{ pageTitle: 'Edit' });
export const removeVideo = (req, res) => res.render('remove',{ pageTitle: 'Remove' });