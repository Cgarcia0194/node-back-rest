const btnIngresar = document.getElementById('btnIngresar');
const txtCorreo = document.getElementById('txtCorreo');
const txtContrasenia = document.getElementById('txtContrasenia');

btnIngresar.onclick = async () => {

    const data = {
        txtCorreo: txtCorreo.value,
        txtContrasenia: txtContrasenia.value
    };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    await fetch('http://localhost:3001/api/auth/login', options)
        .then(resp => resp.json())
        .then(info => {
            switch (info.estatus) {
                case 'success':
                    const {
                        usuario, token
                    } = info.data;
                    break;
                default:
                    const {
                        data, estatus, msg
                    } = info;
                    break;
            }
        })
        .catch(error => console.log(error));
    // const usuarios = fetch('http://localhost:3001/api/personas')
    //     .then(resp => resp.json())
    //     .then(data => console.log(data))
    //     .catch(error => console.log(error));
};