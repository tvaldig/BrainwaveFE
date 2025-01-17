import { StyleSheet } from 'react-native';

const authStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 16,
    paddingTop: 20,
  },
  illustrationContainer: {
    position: 'absolute',
    width: '100%',
    height: '35%',
    top: '8%',
    zIndex: 2,
    alignItems: 'center',
  },
  illustration: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  rectangle: {
    backgroundColor: '#665D68',
    borderTopLeftRadius: 50,
    paddingTop: '5%',
    borderTopRightRadius: 50,
    width: '100%',
    height: '65%',
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: '5%',
  },
  input: {
    width: '80%',
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    width: '80%',
    marginTop: 16,
    padding: 16,
    backgroundColor: '#6c3b88',
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  orText: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 16,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    width: '80%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  // Additional styles specific to auth screens
  switchAuthContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchAuthText: {
    color: '#fff',
    fontSize: 14,
  },
  switchAuthButton: {
    marginLeft: 5,
  },
  switchAuthButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  // Register specific styles
  headerBack: {
    position: 'absolute',
    left: 16,
    top: 16,
    zIndex: 3,
  },
  headerBackIcon: {
    width: 24,
    height: 24,
    tintColor: '#6c3b88',
  },
  registerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6c3b88',
    textAlign: 'center',
    marginBottom: 10,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginTop: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#6c3b88',
  },
  termsText: {
    color: '#fff',
    fontSize: 12,
    flex: 1,
  },
  termsLink: {
    textDecorationLine: 'underline',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'left',
    width: '80%',
  },
});

export default authStyles;