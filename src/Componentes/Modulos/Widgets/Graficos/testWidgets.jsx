

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-----------> IMPORTS 
import React, { useState, useEffect, useRef } from 'react';
import GenderChart from './GraficaPastelSexos'; // Asegúrate de importar el componente adecuadamente
import LineChart from './GraficoLineasRegistroUsuarios'; // Ajusta la ruta del archivo según tu estructura de carpetas
import WidgetPersonalInformation from '../CardUserPersonal';
import '../styles/test.css'

import backendUrl from '../../../../serverConfig';
import axios from 'axios';
import GridCell from './GridCell';
// <LineChart />
import { useSpring, animated } from 'react-spring';


import LogoLogin from '../../../../GlobalStyles/images/IconLogoLifeUp.png';
import imgLogin1 from '../../../../GlobalStyles/images/imgLogin1.svg';


import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importar los estilos del carrusel


/*--------------------------------------------------------  FUNCION PRINCIPAL  -------------------------------------------------------------- */
const TestWidgets = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  const fade = useSpring({ opacity: 1, from: { opacity: 0 } });
  const zoom = useSpring({ transform: 'scale(1)', from: { transform: 'scale(0.5)' } });

  const zoomWithDelay = useSpring({
    transform: 'scale(1)',
    from: { transform: 'scale(0.5)' },
    config: { delay: 2000 } // Agregar un retraso de 1000ms (1 segundo)
  });

  const slide = useSpring({
    from: { transform: 'translateX(100%)' },
    to: { transform: 'translateX(0)' },
  });

  const fadeInUp = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    from: { opacity: 0, transform: 'translateY(20px)' }
  });
  

  const [isAnimating, setIsAnimating] = useState(false);


  const firstAnimation = useSpring({
    opacity: isAnimating ? 1 : 0,
    from: { opacity: 0 },
    onRest: () => {
      setIsAnimating(false); // Cambiar el estado para activar la segunda animación
    }
  });

  const secondAnimation = useSpring({
    transform: isAnimating ? 'scale(1)' : 'scale(0.5)',
    from: { transform: 'scale(0.5)' },
    config: { delay: 2000 }
  });


  const [dato, setDato] = useState('CEDIF-01');
  const [respuesta, setRes] = useState('');
  const [rol, setRol] = useState('');
  const handleInput = (event) => { setDato(event.target.value); }
  let datosnuevos = [null];




  const [sliderValue, setSliderValue] = useState(50); // Valor inicial del slider

  const handleSliderChange = (event) => {
    const newValue = parseInt(event.target.value);
    setSliderValue(newValue);
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-----------> DECLARACIONES 
  /**grafica de pastel */
  const datos = [
    ['Género', 'Cantidad'],
    ['Masculino', 40],
    ['Femenino', 60],
  ];
  /**grafica de linea */
  const usersData = [
    ['Mes', 'Usuarios'],
    ['Ene', 20],
    ['Feb', 30],
    ['Mar', 15],
    ['Abr', 35],
    ['May', 47],
    ['Jun', 17],
    ['Jul', 50],
    ['Ago', 75],
    ['Sep', 65],
    ['Oct', 59],
    ['Nov', 70],
    ['Dic', 54],
    // ... y así sucesivamente para los otros meses
  ];
  const datos2 = [
    ['Género', 'Cantidad'],
    ['Masculino', 90],
    ['Femenino', 10],
  ];

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-----------> FUNCIONES 



  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-----------> USE EFFECT() 
  useEffect(() => {




    //fetchUsers();
  }, []);



  /*      
  pastel

  <GenderChart 
    color1={'#477BFF'}
    color2={'#47D1CB'}
    hole={0.5}
    titulo={"Distribución de sexo"}
    datos={datos}
    Graphic3D={false}
      />

lineas
          <LineChart 
           color={'#477BFF'}
           titulo={"Registro de usuarios"}
           descripcion={"Comportamiento de la alta de usuarios"}
           titleX={"Meses"}
           titleY={"Usuarios"}
           datos={usersData}
           />
    */

  /* <WidgetPersonalInformation
        Nombre={"Jose Javier Gutierrez Ramirez"}
        Direccion={"Madroño 128, Valle de león, 37140."}
        Sexo={"Masculino"}
        Fecha={"12/03/2001"}
        Familiar={"Cesar Delgado Cardona"}
        Edad={"23 años"}
        Telefono={"4772284248"}
        ID_user={"FFFFFF"}
        ImageURL={"https://scontent.fbjx1-1.fna.fbcdn.net/v/t39.30808-6/361244890_3228751760604739_6437972533790968361_n.jpg?_nc_cat=108&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeEuR0Wydv3DyV80zvV1CZ75V0CqCGxFihlXQKoIbEWKGWUYBdsw_Vak4xFpVqj2QuDAwg_0FVGQF2KJcGz0GIjz&_nc_ohc=eWSTSq3D4kkAX8UA6rr&_nc_ht=scontent.fbjx1-1.fna&oh=00_AfBZxa1ReVTOuTYMlsrhCv8JV6ht8ccAlEvWTNc8MJp57w&oe=64C4B6E8"}
      />
 
     />

     */

  const enviar = () => {
    serverConect();
  }


  const serverConect = async () => {

    //datos a enviar
    const datosEnviar = {
      dato
    };


    //peticion al server
    axios.post(backendUrl + '/test', datosEnviar)
      .then(response => {
        // Manejar la respuesta del servidor si es necesario
        setRes(response.data.Valor);
        setRol(response.data.Rol);



        //setNombre(response.data.Nombre);


      })
      .catch(error => {
        // Manejar errores si ocurre alguno
        console.error(error);
      });
  };


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-----------> RETURN () 
  return (
    <div id='body'>
    <Carousel autoPlay={true} interval={1000} infiniteLoop={true}>
      <div>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATcAAACiCAMAAAATIHpEAAAAmVBMVEUPJW4OJGsOImcLnP8XN5kKpv8PI2weSMEPHGYTLoMSLH4RKnkPFmEPHWcXN5gOImYVNJELov8QJ3MZPqgLn/8PGGMhUdYgTs8bQbAKqP8UMYoLo/8eScMVNZILlfYYOp8cRbkORZENcccMf9kMe9QOVKMNaLwNX7ALju0MfdYOSZUPM30OPokOUZ8PLXcMh+QPA1cPDlwjVN/gJPH7AAARp0lEQVR4nO1diXqquholIAEhGGRIEChQB7Rqy2nf/+FuwAlCcNhDpXezznfabowaln/+OVGSBgwYMGDAgAEDBgwYMGDAgAEDBjwfAED2X/mb4dmT+RmAsixL43A0MgMHuONJaDjPnlLfUYqWMwo0En4F7ggHcZbJQUypCZ89sx6DLUgjxEEwGRGMqZa52CTEADhwcUUbkJ89wz4CyEboEBKMKQbExDTL4pDYNhljbVQpOBBkB+IGdVcDmMSUhNTWKDGwNga2PTYdJoKOA0KzGiFnWsUbCAdDcYQsOSETrDRzA5ympiQDqWZFT3/IFW2yS6j7lFn2DVAKCHWIE8aZGd72OogBsxjLg8xJxAXOJPvSXu5x1Rw2Whq77Oc/zxwzmkyCpPtECDgBIWMSBnT8jxPHNBZ5RGPJkjmiGLua5PzbzAFbesw1A8AlKQk1Jqh/aUr9BjwGUI/fvWxmbkqZRvzDM/oZAET71RgAyICamR1k+KdRJ/9+2APS8DfuGshZRkz6m2v1D9zGQ2Am8JDkueChpx9+/tY9A5vY2CYPcs/NOc6+WWAJSUcNuA9MQLb/RG4ImECizCF5RGTA2K3NeZIS8gcm8sj7hy8y99HdT5z8Qk3B5dvZIn4EW6oYuKP7iYPjUWPa8svvqIpfgWCN3UscsL8yzF2DFtIt9j/sJA/qxxH1i46EXRrb9xJX0sbNpQ925T7imFIxKadWIMw3XuQlbytdFzHHaN3O2YhpMv/QGy82ItmE2vfdPWjR1hPcQxwYB5jF8o1r+lZRi3ydLxPVY8S0mLOsXJkpCzZiMY3WqP6QnLnZxLjLqvaWtruIk20NcyGStVU3O2RZlo/28yia61bjGRCtPXWxRX45Ar7Ncr/xenEKAb2DkB7Tdg9xLgvM48YoKHkbdJQxqMN5pLyjmsjp+2S22J0HfM5n+4ZAgpH9Qm/7v2A86S9tN4kDzMfPOGWsL6cfFyagv9vMlv7pAkS5mmzrPKJk01ip0NFiGt/6wHotbSXca+4EsENs0KYxhXA6b+h6+LlWk511fLCokVjBWs1em+/BXjIcXc+O9J62GxJHRy/jUfOuGQ87jmt9r0zfSy1m7ZJpY9GWQF6TZ/ZpMJVJr80JhL1epAd0EydnkzjlfTd9qSB+ILQKldlN/XV6Erwa/MWGewIIAQ5aPmH98d7Qds1h7CIOSoSOKL+O0Wbht4ei5Sz/713dCBxhK494oqGp0W4vrk+0jUM+zqqhgzgQw+yrFdgghVt2x8vz2SIqfIG2hO8qv7DBJANG18fVI9rKuD5ooEEHcEXJEpAGGLfLAkhdt5ZidZ0Z0v+EwcOr+spfB/J5BQAefaINaNQw64ibcsQlSw5sURK0rR60OngriZu3NF/5jL267TbaIBxxeOkPbUzFYwBrAHKTONiWN+Cmjha0eZPUlYA3qFdLNRcQd523trz1IXTvhqzdSMmYriSsF+sieYP7JbvIjMOqrfsYb611+oNxgzhoaCQTpStRlLd4g5KSlNk2VKiv7Qe36l7IW88lqwtyfC2fw/RzRkSPC+wp9DdeFXpB/fhH49GV2rpWvX9Gxabh7jt4EuQrGUTwQuJAWGNn/hvPG1qo+2OcxQSP90WsXBWZCxbgH7WnkTYQ9skuCCFrncTJGh2JP3m95f7r69n6RCXcRwv+4WUi5O28Ts0Xuw6tR35IBxhxWOZxcN7KhiPh/K182qSB6f3l5UqdxAP8TdEOMBpoLlP8E4jLtBZKcwHSLzoRKxqmrhruP7SUzad+hvXfMtpb9QGffFx/C1jrTIaAZxvmsx+HeVTyJlNj0pGUhbuDAwehZekI+R+Lab7O5/P5crlkP/P1SmHBPXtAt6pgtRzfXb0RfjZM4nDbrSvrWePn9pgAx+hEWfIDBsW2eJlWBtVnjFn7Vb7YKKoaTaOppyRJsmH/K54XTafqzNss5us9RLqld5jTErIp9oWwFrhCfHf9tAlgpuOwC0Y5YELHWpeX4i820mq5mapqRc77606yfHSCb0kf+/d1/lZRmrytd11moYz+CEmF7wLGYtD4ifIGjFQWLoOL9wQCSkUzLFeetZ5GarLItx8I6eVihI3kUflPiy1hH0mv62USqdMlU2+WSOQAAeOOXp2OyeHupN1fR0nbjSFyFr4I6vFQt1jExBTW3CmLyld0NCyLg4w/H8FVxNShtZYEKSYcG7LQtz7NlAMEwSPtGX8E51nfQRtTb1LcWkAQ7ZfTqIzfk7fTytPFqRH4sTiF8tZaZQTuZtFii/jBwI3NK7zJo0kzUzJxydeNqf9hQMc8fWi3aWNeiIszrssPotdC9eZlpKnPvSNvaNmRU7KSk1JDRekmw488mSUrvvTgBFe6V+XUaNlTV6wO/xogIfZB7du3aWPaLTBpM6bXd8UsWR+6GuDr7CBN1nbWjvEP77ef5ZXTBiW1GgIt9L6ZbV6bzMlMgLpWXklbe2bf3VZDySlveU9vQxg3eyvLqqiyRieNhpRlRQpKLqYSMkPgX5YtOhZZ2TI9eckQbZPZW0MryjQcx2JVL6Tt+wEeasst09i1f0JpM1taF8liC1WvDOu5Msp037zYbJbnIiCUppUSRJtaNMvoj5R9TULl2MBEKP89oe23AHeK1yjBs1XIbCSE3imEtz6KyPOYzztNTrToednfwGxvQwPquyTaXqIuZh9fDp6syeH/gbYPReGqoigpEJO66LgES2KVI6bbY0bJVw5jmpVBaG2iS2oTMEf2oG9tDveok2+B0+3ptrzeJtDG++C0f6W1PqL5Ic/BIvszbYy4I5nWilkPpLxxuRDIXu7iFJmj1K2yfHfM4xlgdiHsCF2aMKrh9XCbabEtbzTLHpHP5fR4/0zdXWhTvJNCQ8nms9UbUorv9MwlMLKA3NlF+BQ8xhs0azuJqvXGw196UnRMD0GrThsTuGM1Ab7PXgs+xymVmu8S6AOcCXuH+4NH1ilIv84pcmYD3gX1q12UeEfNBbfTBm/eyadDmyQS1b6kmq2If95WkCsAF2vGVJmo+RkV524ua92UN+/t+AB8jxJRphcly5NJNYlGvzkE+Ku43ArjTdT67M+jk3a3co63c92mMrttsPj27IqMbPvnexwiWO+i6ifTacuTKFkrjrdzWpyZFFHlFE3P0RnAOH1E3n7OxmkIo7xdHqiFT0zXNfXb9JIW91tuiHSwF6cRZhbEVR0DtMpDQnx/Hukh1CfHTGdbwTVWICqaAncJQfU8aqfxmLk4P9d03bhMvABBfUiA+LvzSI/Bqasc5m8Vn9wAuC2NLDzp/31UF7eTsWRqEX6orYQJymv+IMQ4s++XN+yOeiJvIkcEjLW6c8Ac/+VnU2r8hYIYXScDwMTqQtspZvWX71BCC764gNazS7cXCIP05ZE9cz0JJIATZ01o5cQcSkmtg4vd6qKR5T7oPPh6rjCj9fSwVL3oRAp7lImatW0GDPAzn9Xq+cDVKPl551Ax2ky+Xl9el8m4EVejtZrsa8wdrQJanDWfvlsq0+nUW7yeSDlqsVOq7jjMKWb13kI5G7n37J25zLgP8lbSJpyHHEugcaiWvk/UuXX2445JNRbZnxscoK7v9nvrTG4Z1ZZ/s9j1bCasUixX9XWLaZp25C2bMz3WZXphTztpK/vk5WYZEOrzyMvhgblzUo1FmjX/rF4PZP7dweCWqbrDk3R/ncwWUsNMgIlj3OG+gTB9Ul1GctrxqUO7klzApRlXrYdsJarefFfmyqsSVXXRTwRxewm0POXmPhUWHEALSbkyK/bN8gIwYuzc3olbdko/qS4DCBlNOHRJm1RuAiSt1hbof8y92Wb9gT7PWQ7mj6xFPTOlUTjZ2rn3ieCqUKPFni9nMYWQ3d5wX28wf0JdhqdtciWlKgcZFbRE+9Z6o6qbfLr+PPTMMNMwFTV/nAo2bBDcqvNiOkvyD0Hh2cnIzVNsntuXf19q9wQ5BljUxsXW28e6mE6VIt9KyC+3iXui7Nxc3VuWriP4AaGueJt8j0TVfUyCdnmbn3j4zONawChtNwheugRbcJxQE+cpGHXWdr6ZqpFSzD8gc4rXZfebdQL7G+2jHL6u5otEZZ6xX2z+62iJcMbYCERZ8hrC56aDCdG0TIBYyA6wAy3tNPnQ0pG+X8+LslDAnLhisZzP8zxfr9mP+XJRKJ6nqqqyWa6Z02vlUdfpBTKWR071dvzejwueSxtwg478bgdxpWN1Va0w8ny/ap5h6zBRPOb1RqXnqySbYjnPV3vJR3opZ6JtRgfIcRCSjuD0LnXyDeg63rSDODmISdcOUasZqTNe8v8Q8pm2s/yqD84/dHedBvjt2P743uOABnK1SZdH2vvj4sTEMU/T7Ej8W+/zJg1+fqxAdKzGenqXexeclV4INCYvHOz4uw9YeRglcYIQNQYwFY5v79tFxfSSxIQtjtqN+2fAgw7ld4eV6D9xUOKSg1WHrxuTWFih8wu+rZ6puOQUu34WBU+clXtdvF1pWvkBxEmClIjkEFN8DGqtGnWCtY+OXhzKZ63KX0dF7BZ+AnECYC2UAtHMa1WVM/TVIT10+t2A1d7vfBd+KHGSS6ioadkX7aMs5QxJ1qvKbzKSOvdRAucWmf0nThSCgcDI3DZvHfudP5ezFdpPN4IgVLxvF4y/btYK2sQ9251rAJiiPQySbBIwat1wx37nck/g2ktEAVXHfmcnMKqrXONbI85nxDXCQ5z2qAkHGKnJ7ZmpUv7MpFLaTlcI9zuXlYMiSoQuXNd+58NeKzC2Gx/ZqHliQsPSZ9pz98s00NlgDg1qv7S3PIvsglTaVCUR7yfq3O98fP8mZLshUtwGlayd3XoSrvTlA8zioFb6X+CHMJRH1ZTSJiBI4IdcU1PAvrIWe9PncHU7A6YhzvgEWfvYHga0UjdVEC84RU+f8wEGNK4dDnqVuJ7g+i4QEFL8wh3HVW775rU/LA+rqQizlKJlGj4TbmM5MAgRWOrL470n7tbmGTmghM+A8S3iZTf5ZpYfKvrWKlL2Pjd+xhlgSEOTXEt4ALvfR3Lf3nMERobJH69d74uRSkO68rz384atXaLmjfoLWnpNEZRdDYfC3YaXt+21xIHx7T1HTL/hLGgMg9vasTQQ7YpZUauKQn8+qx84qG9nzT4w2Qjt9NbZ+H0m7h7a2A0wyfhqJkbQkgVVZakKWmj/pirN7WoQ7ZNZsa3O9oUQvU6bZgSnhJrCwJd7374Sdxdt7D6Z96txt4DeZsW75MN9vlG93Gp16aNVMkvm2w8fvi65I+HAhMruHceC9pa4u0+QlFO31cFREqNGqhoVa+HBxxZ6X3jsYXWmNJUdk10H3+e89pO4Bw7eFDmpbIGu1utXKCyLVgN8vRrhc8dFh1oc3Pk1Dr0gjisMPX5eKc9euYf+ajqy2mXfHACwTYzs7q8CaJec4bf3OcTUdGoIH6bN/v1cGAiCSUCc+9+5RZzz7ec5EDKxa/Wih0nA5Ho59TYAGBE340+Iv/GccbOl5fu/f8Ec390cIgQ0fnMbVfk1SFnc1VfR+SwuWTL+7v2V4gN1HnmB4+9fe52ysBdg6eqJc3e9zrPPR/pVgF+5c2YPXNkhAe1NGuibIeOUgodFF5haRkznMdX2/wQQp2Qsjx78kkTH1iZBrLmTJ57R82Q4GTUAJHJo3rvigIy1EdZeNP7bCP4t4FBzUkqp69p3MAdk4BKXmPiFhv+usFUAOM1sgvEooO4tdwbYgQxMqpGsX3XP54CtPBo6mRbEshEAgEHnF2lBk0AZ/MB9RH8L0AziEZ3gtEzcprLhyDKWAbh0Cx9/Yy2Ln9yf2zPIpkvDNGbUxUTK0oDQeGRkmnboZzOzKp0LNOoav+1w/38BAtlwYzpinAXxmJhwQifBOKwWJRh/vRz2Y8qDXmsDAmwabugQ4nzZZhqbNpZItR3uZDAG0rpQBtumLacaE70x80/+2ZDgF8A0GDMJuLILvT/oecCAAQMGDBgwYMCAAQMGDBgwYMCAAQMGDBgwYMCAAQMGDBgwYMCAAQMGDBgwYMCAAc/H/wCs+FDK7sPwMAAAAABJRU5ErkJggg==" alt="Imagen 1" />
        <p className="legend">Leyenda de la imagen 1</p>
      </div>  
      <div>
        <img src="https://bs-uploads.toptal.io/blackfish-uploads/components/seo/content/og_image_file/og_image/1276565/1015_Next.js_vs._React-_A_Comparative_Tutorial_Illustration_Brief_Social-d04df761f8138010d9d98703e77ce0e9.png" alt="Imagen 2" />
        <p className="legend">Leyenda de la imagen 2</p>
      </div>
      <div>
        <img src="https://bs-uploads.toptal.io/blackfish-uploads/components/seo/content/og_image_file/og_image/1276565/1015_Next.js_vs._React-_A_Comparative_Tutorial_Illustration_Brief_Social-d04df761f8138010d9d98703e77ce0e9.png" alt="Imagen 3" />
        <p className="legend">Leyenda de la imagen 3</p>
      </div>
    </Carousel>
    </div >

  );
};

export default TestWidgets;
