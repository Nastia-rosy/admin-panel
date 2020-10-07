const editFormStyle = (theme) => ({
  form: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  formLegend: {
    marginBottom: 10,
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 16,
    color: '#1B1F36',
  },
  formErrorIcon: {
    width: 16,
    height: 16,
    color: 'rgba(0, 0, 0, 0.3)',
    lineHeight: '19px',
    transform: 'translate(25%, 25%), rotate(180deg)'
  },
  formSaveButton: {
    background: '#4CAF50',
    color: '#fff'
  },
  formButton: {
    textTransform: 'uppercase',
  },
  formSaveButtonWrapper: {
    marginBottom: '10px'
  }
});

export default editFormStyle;