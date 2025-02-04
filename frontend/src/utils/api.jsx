async function resetPassword() {
  try {
    //Make sure the user has inserted the same password twice
    const token = null;
    console.log('This is token:', token);
    if (newPassword === confirmPassword) {
      const response = await fetch(`${backendURL}/api/resetPassword`, {
        mode: 'cors',
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resetToken: token,
          newPassword: newPassword,
        }),
      });

      if (response.status === 200) {
        await setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
      }
    } else {
    }
  } catch (error) {
    console.log('Error:', error);
  }
}
