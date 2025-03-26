import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';
import '../IoT/VentanaCtrl.css';

const MQTT_BROKER = "wss://584812d491644e289c0361eee4ae4aa5.s1.eu.hivemq.cloud:8884/mqtt";
const MQTT_OPTIONS = {
  username: "Angel19",
  password: "iS4@vJiy@Pfkt9e",
  clientId: "reactClient-" + Math.random().toString(16).substr(2, 8),
};

const imageStyle = {
  width: '80px',
  height: 'auto',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
  marginBottom: '5px'
};

const textStyle = {
  margin: '0',
  fontWeight: 'bold',
  color: '#ffffff'
};

const VentanaCtrl = () => {
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [sensorData, setSensorData] = useState({
    temperatura: '--',
    humedad: '--',
    calidad_aire: '--',
    lluvia: '--',
    estado: '--',
    seguro: '--'
  });

  useEffect(() => {
    const mqttClient = mqtt.connect(MQTT_BROKER, MQTT_OPTIONS);

    mqttClient.on('connect', () => {
      console.log('Conectado al broker MQTT');
      setIsConnected(true);
      mqttClient.subscribe("ventana/+", (err) => {
        if (err) {
          console.error("Error en la suscripción", err);
        }
      });
    });

    mqttClient.on('error', (err) => {
      console.error('Error de conexión: ', err);
      mqttClient.end();
    });

    mqttClient.on('message', (topic, message) => {
      const msg = message.toString();
      console.log(topic, msg);
      switch (topic) {
        case "ventana/temperatura":
          setSensorData(prev => ({ ...prev, temperatura: msg }));
          break;
        case "ventana/humedad":
          setSensorData(prev => ({ ...prev, humedad: msg }));
          break;
        case "ventana/calidad_aire":
          setSensorData(prev => ({ ...prev, calidad_aire: msg }));
          break;
        case "ventana/lluvia":
          setSensorData(prev => ({ ...prev, lluvia: msg }));
          break;
        case "ventana/estado":
          setSensorData(prev => ({ ...prev, estado: msg }));
          break;
        case "ventana/seguro":
          setSensorData(prev => ({ ...prev, seguro: msg }));
          break;
        default:
          break;
      }
    });

    setClient(mqttClient);
    return () => mqttClient && mqttClient.end();
  }, []);

  const sendCommand = command => {
    if (client && isConnected) {
      client.publish("ventana/control", command);
      console.log("Comando enviado:", command);
    }
  };

  return (
    <div className="wrapper">
      <div className="ventana-ctrl-container">
        <h1 className="ventana-ctrl-title">Control Inteligente IoT</h1>
        <div className="ventana-ctrl-card-container">
          {/* Panel de Control */}
          <div className="ventana-ctrl-card">
            <h3>Control de Ventana</h3>
            {/* Texto arriba de los botones que indica el estado de la ventana */}
            <p style={{ ...textStyle, fontSize: '1.4rem', marginBottom: '10px' }}>
              Estado: {sensorData.estado}
            </p>
            <button className="ventana-ctrl-button" onClick={() => sendCommand("a")}>
              Abrir Ventana
            </button>
            <button className="ventana-ctrl-button" onClick={() => sendCommand("c")}>
              Cerrar Ventana
            </button>
            {/* Iconos y texto según el estado de la ventana */}
            {sensorData.estado === "Abierta" ? (
              <div className="icon-control-ventana mt-4">
                <img 
                  src="https://res.cloudinary.com/dr29apyqc/image/upload/v1742980200/bijpw4i3oxnbmhk8bzvt.png" 
                  alt="Ventana Abierta" 
                  style={imageStyle} 
                />
                <p style={textStyle}>Abierta</p>
              </div>
            ) : sensorData.estado === "Cerrada" ? (
              <div className="icon-control-ventana mt-4">
                <img 
                  src="https://res.cloudinary.com/dr29apyqc/image/upload/v1742980194/ppa4m2u6d2psgmyyc59q.png" 
                  alt="Ventana Cerrada" 
                  style={imageStyle} 
                />
                <p style={textStyle}>Cerrada</p>
              </div>
            ) : null}
          </div>

          {/* Estado del Seguro */}
          <div className="ventana-ctrl-card">
            <h3>Control del estado del Seguro</h3>
            {/* Texto arriba de los botones que indica el estado del seguro */}
            <p style={{ ...textStyle, fontSize: '1.4rem', marginBottom: '10px' }}>
              Estado: {sensorData.seguro}
            </p>
            <button className="ventana-ctrl-button" onClick={() => sendCommand("d")}>
              Desbloquear
            </button>
            <button className="ventana-ctrl-button" onClick={() => sendCommand("b")}>
              Bloquear
            </button>
            {/* Iconos y texto según el estado del seguro */}
            {sensorData.seguro === "Bloqueado" ? (
              <div className="icon-seguro mt-4">
                <img 
                  src="https://res.cloudinary.com/dr29apyqc/image/upload/v1742980789/vwmsrvxy4tnqtgr4xpuf.png" 
                  alt="Seguro Activado" 
                  style={imageStyle} 
                />
                <p style={textStyle}>Bloqueado</p>
              </div>
            ) : sensorData.seguro === "Desbloqueado" ? (
              <div className="icon-seguro mt-4">
                <img 
                  src="https://res.cloudinary.com/dr29apyqc/image/upload/v1742980782/p43xydacchzsq24akbue.png" 
                  alt="Seguro Desactivado" 
                  style={imageStyle} 
                />
                <p style={textStyle}>Desbloqueado</p>
              </div>
            ) : null}
          </div>

          {/* Datos del Sensor */}
          <div className="ventana-ctrl-card">
            <h3>Datos del Sensor</h3>
            <p style={{ fontSize: '2rem' }}>Temperatura: {sensorData.temperatura} °C</p>
            <p style={{ fontSize: '2rem' }}>Humedad: {sensorData.humedad} %</p>
            {/*
            <p>Calidad de Aire: {sensorData.calidad_aire}</p>
            */}
            <p>Lluvia: {sensorData.lluvia}</p>
            {/* Iconos y texto según el estado de lluvia */}
            {sensorData.lluvia === "Sin lluvia" ? (
              <div className="icon-lluvia">
                <img 
                  src="https://res.cloudinary.com/dr29apyqc/image/upload/v1742980899/alvgbk1atqu06rfjrdao.png" 
                  alt="Sin lluvia" 
                  style={imageStyle} 
                />
                <p style={textStyle}>Sin lluvia</p>
              </div>
            ) : (
              <div className="icon-lluvia">
                <img 
                  src="https://res.cloudinary.com/dr29apyqc/image/upload/v1742980906/ztpyxklbdkaeaxsmyzqi.png" 
                  alt="Con lluvia" 
                  style={imageStyle} 
                />
                <p style={textStyle}>Con lluvia</p>
              </div>
            )}
          </div>
        </div>

        {/* Información Adicional */}
        <div className="ventana-ctrl-info">
          <h3>Información del Dispositivo</h3>
          <p>Estado de Conexión: {isConnected ? 'Conectado' : 'Desconectado'}</p>
        </div>
      </div>
    </div>
  );
};

export default VentanaCtrl;
