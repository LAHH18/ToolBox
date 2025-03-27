import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';
import Swal from 'sweetalert2';
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

  useEffect(() => {
    if (sensorData.calidad_aire !== '--') {
      const calidadAire = Number(sensorData.calidad_aire);
      if (calidadAire < 2800) {
        Swal.fire({
          title: '⚠️ Alerta de Calidad del Aire',
          text: `Calidad del aire peligrosa (${sensorData.calidad_aire}). Se recomienda cerrar ventanas.`,
          icon: 'warning',
          confirmButtonText: 'Entendido',
          background: '#2c3e50',
          color: '#fff',
          timer: 5000,
          timerProgressBar: true
        });
      }
    }
  }, [sensorData.calidad_aire]);

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
          {/* Widget 1: Control de Ventana */}
          <div className="ventana-ctrl-card">
            <h3>Control de Ventana</h3>
            <p style={{ ...textStyle, fontSize: '1.4rem', marginBottom: '10px' }}>
              {sensorData.estado}
            </p>
            <button className="ventana-ctrl-button" onClick={() => sendCommand("a")}>
              Abrir Ventana
            </button>
            <button className="ventana-ctrl-button" onClick={() => sendCommand("c")}>
              Cerrar Ventana
            </button>
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

          {/* Widget 2: Control del Seguro */}
          <div className="ventana-ctrl-card">
            <h3>Control del estado Seguro</h3>
            <p style={{ ...textStyle, fontSize: '1.4rem', marginBottom: '10px' }}>
              {sensorData.seguro}
            </p>
            <button className="ventana-ctrl-button" onClick={() => sendCommand("d")}>
              Desbloquear
            </button>
            <button className="ventana-ctrl-button" onClick={() => sendCommand("b")}>
              Bloquear
            </button>
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

          {/* Widget 3: Temperatura y Humedad */}
          <div className="ventana-ctrl-card">
            <h3>Condiciones Ambientales</h3>
            <div className="sensor-data">
              <div className="sensor-value">
                <p style={{ fontSize: '1.5rem' }}>Temperatura:</p>
                <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{sensorData.temperatura}°C</p>
              </div>
              <div className="sensor-value">
                <p style={{ fontSize: '1.5rem' }}>Humedad:</p>
                <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{sensorData.humedad}%</p>
              </div>
            </div>
          </div>

          {/* Widget 4: Lluvia y Calidad de Aire */}
          <div className="ventana-ctrl-card">
            <h3>Estado Exterior</h3>
            
            {/* Sección de Lluvia */}
            <div className="sensor-section">
              <p style={{ fontSize: '1.5rem' }}>Lluvia: {sensorData.lluvia}</p>
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
            
            {/* Sección de Calidad de Aire */}
            <div className="sensor-section">
              <p style={{ fontSize: '1.5rem' }}>Calidad de Aire: {sensorData.calidad_aire}</p>
              {sensorData.calidad_aire !== '--' && (
                Number(sensorData.calidad_aire) < 2800 ? (
                  <div className="icon-calidad-aire">
                    <img 
                      src="" 
                      alt="Mala calidad de aire" 
                      style={imageStyle} 
                    />
                    <p style={{ ...textStyle, color: '#ff6b6b' }}>Mala calidad de aire</p>
                  </div>
                ) : (
                  <div className="icon-calidad-aire">
                    <img 
                      src="https://res.cloudinary.com/dr29apyqc/image/upload/v1743061834/snqbnlue9qs79ov1a7wa.png" 
                      alt="Buena calidad de aire" 
                      style={imageStyle} 
                    />
                    <p style={{ ...textStyle, color: '#51cf66' }}>Buena calidad de aire</p>
                  </div>
                )
              )}
            </div>
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