const annotationImageStyle = (theme) => ({
  uploadImgButton: {
    display: 'block',
    margin: '0 auto 10px',
    color: '#fff',
    backgroundColor: 'rgba(30, 139, 195, 0.5)',
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
  },
  annotationWrapper: {
    width: '100%',
    height: '100%'
  },
  wrapper: {
    position: 'relative',
    height: '100%',
  },
  wrapperForAnnotation: {
    height: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
  annotationButton: {
    marginLeft: 8,
    textTransform: 'uppercase'
  },
  editButton: {
    textTransform: 'uppercase'
  },
  buttonWrapper: {
    marginBottom: 24
  }
});

export default annotationImageStyle;