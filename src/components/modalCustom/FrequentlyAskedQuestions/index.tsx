import { Modal } from "antd";
import { modalCustomProps } from "../types";
import "./index.scss";
import Link from "next/link";

export const FrequentlyAskedQuestions = ({
  open,
  handleClose,
}: modalCustomProps) => {
  const handleCloseModal = () => {
    handleClose();
  };
  return (
    <Modal
      className="frequently-asked-questions"
      title="Preguntas frecuentes"
      width={700}
      open={open}
      closable
      onCancel={handleCloseModal}
      footer={null}
      style={{ top: "30px" }}
    >
      <div>
        {/* ESTO DEBE CAMBIARSE POR LOS TEXTO REALES */}
        <h2 className="sub-title-faq">¿Qué es Eco-V?</h2>
        <p className="paragraph">
          ECO-V es una empresa con más de 15 años de experiencia en
          sostenibilidad, especializada en energía solar y proyectos
          ambientales. Te permite ahorrar en tus facturas de luz mientras
          generas ingresos compartiendo esta solución con otros.
        </p>

        <h3>¿Cómo funciona el modelo de negocio?</h3>
        <p className="paragraph">
          Adquiere tu sistema de paneles solares y comparte esta oportunidad con
          otras personas interesadas. Juntos, podemos alcanzar la meta de
          reemplazar con energía solar más de 30 millones de kWh generados por
          combustibles fósiles, lo que equivale a la absorción de CO₂ de
          aproximadamente 714,286 árboles en un año.
        </p>

        <h3>¿Quién puede participar?</h3>
        <p className="paragraph">
          Cualquier persona mayor de 18 años en México interesada en ahorrar en
          energía, generar ingresos extra y contribuir al cuidado del medio
          ambiente.
        </p>

        <h3>¿Cómo ayuda ECO-V al planeta?</h3>
        <p className="paragraph">
          Estamos comprometidos con generar un impacto positivo. En esta primera
          etapa, nuestro objetivo es producir más de 1 millón de KWH con energía
          solar, reemplazando el uso de combustibles fósiles y reduciendo la
          huella de carbono.
        </p>

        <h2 className="sub-title-faq">Productos</h2>
        <h3>¿Qué incluye el sistema de paneles solares?</h3>
        <ul className="list-faq">
          <li>10 paneles solares bifaciales.</li>
          <li>Estructura de aluminio resistente a huracanes.</li>
          <li>Inversor bifacial.</li>
          <li>Baterías incluidas.</li>
          <li>Instalación profesional</li>
        </ul>

        <h3>¿Cuál es el costo?</h3>
        <p className="paragraph">
          El sistema tiene un precio total de $249,600 MXN, dividido en 61 pagos
          semanales. Los primeros 12 pagos son de $1,200 MXN, y los siguientes
          49 de $4,800 MXN. Nuestro modelo está pensado para que puedas adquirir
          tu sistema fotovoltaico sin costo, gracias a tu recomendación con más
          personas interesadas.
        </p>

        <h3>¿Hay algún requisito financiero?</h3>
        <p className="paragraph">
          No importa tu historial en buró de crédito.{" "}
        </p>

        <h2 className="sub-title-faq">Ingresos</h2>
        <h3>¿Cuánto puedo ganar?</h3>
        <p className="paragraph">
          Dependiendo de cuántas personas decidan unirse gracias a ti, puedes
          ganar hasta $60,000 MXN mensuales o más. Además, puedes recuperar el
          costo de tu sistema.
        </p>

        <h3>¿Cómo se pagan las comisiones?</h3>
        <p className="paragraph">
          Las comisiones se depositan mensualmente en tu cuenta bancaria.
        </p>

        <h3>¿Qué soporte recibo como distribuidor?</h3>
        <p className="paragraph">
          ECO-V ofrece capacitación, material de marketing y asesoría continua
          para ayudarte a crecer tu negocio.
        </p>

        <h3>¿Tienes dudas?</h3>
        <p>Ingresa a</p>
        <p className="t-bold mb-2">
          <Link href="http://www.ecov.mx/inicia-tu-negocio" target="_blank">
            www.ecov.mx/inicia-tu-negocio
          </Link>
        </p>
        <p>O contáctanos por WhatsApp al</p>
        <p className="t-bold mb-2">
          <Link href="https://wa.me/9981676032" target="_blank">
            998 167 6032
          </Link>
        </p>
      </div>
    </Modal>
  );
};

export default FrequentlyAskedQuestions;
