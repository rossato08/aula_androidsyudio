import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  hexInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  selectedColorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  selectedColorSquare: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  selectedColorText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  selectedColorHex: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: '#000',
    marginTop: 5,
  },
  colorNameContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  selectedColorName: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: '#000',
    marginTop: 5,
  },
  clearButton: {
    backgroundColor: '#e02424',
    padding: 10,
    borderRadius: 8,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});