const formChooseDateStyle = (theme) => ({
  formChooseTime: {
    display: 'flex',
    alignItems: 'center'
  },
  formDate: {
    margin: '5px 0 24px',
    padding: '25px 0',
    borderTop: '1px solid #E3E3E3',
    borderBottom: '1px solid #E3E3E3',
  },
  formTime: {
    color: '#1B1F36',
  },
  formTimeField: {
    width: 78,
    lineHeight: 40,
    margin: '0 9px 5px'
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
  labelDate: {
    margin: 0,
  }
});

export default formChooseDateStyle