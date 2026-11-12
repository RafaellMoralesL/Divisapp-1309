import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton } from '@ionic/react';
import React, {useState} from'react';

import './Home.css';

const Home: React.FC = () => {
  const [monto, setMonto] = useState<number>(0);
  const [resultado, setResultado] = useState<number | null>(null);

  const calculoDeDivisas = () => {
    setResultado(monto / 8);
  };

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="ion-text-center">
            DivisApp 25001309
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className='ion-padding'>
        <div style={{maxWidth:'450px', margin:'60px auto 0 auto', padding:'0 10px'}}>

        <IonItem mode="md" style={{ margin: '20px' }}>
          <div slot = "start" style={{marginRight:'5px',fontWeight:'bold',color:'#555'}}>
            Q
          </div>

        <IonInput
          label="Monto de Quetzales a Convertir:"
          labelPlacement="floating"
          type="number"
          placeholder="0.00"
          value={monto === 0 ?'':monto}
          onIonInput={(e) => setMonto(Number.parseFloat(e.detail.value!) || 0)} 
        />
      </IonItem>

      <IonButton
        expand="block"
        color="primary"
        shape="round"
        onClick={calculoDeDivisas}
        style={{margin: '15px 0'}}
        >
          Calcular Conversión
      </IonButton>

      {resultado !== null && (
        <div style={{ textAlign: 'center', padding: '15px', borderTop: '1px solid #e0e0e0' }}>
          <p style={{ color: '#666', margin: '0', fontSize: '0.9rem' }}>Resultado de la conversión:</p>
            <h2 style={{ fontWeight: 'bold', fontSize: '2.2rem', color: 'var(--ion-color-success)', margin: '5px 0' }}>
                ${resultado.toFixed(2)} Dólares
            </h2>
        </div>
        )}

      </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
