import Alert from "react-bootstrap/Alert";

type WarningProps = {
  heading?: string;
  children: React.ReactNode;
  handleAlert?: (close: string) => void;
};

const AlertBox: React.FC<WarningProps> = ({
  heading,
  children,
  handleAlert,
}) => {
  const onClose = () => {
    if (handleAlert) {
      handleAlert("close");
    }
  };

  return (
    <Alert
      variant="danger"
      onClose={onClose}
      dismissible
      style={{ marginBottom: "0" }}
      className="container"
    >
      {heading && <Alert.Heading>{heading}</Alert.Heading>}
      {children}
    </Alert>
  );
};

export default AlertBox;
