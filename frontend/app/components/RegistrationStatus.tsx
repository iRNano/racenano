interface RegistrationStatusProps {
  registration: {
    raceId: number;
    category: string;
    status: string;
    registrationDate: string;
    paymentStatus: string;
  };
}

const RegistrationStatus: React.FC<RegistrationStatusProps> = ({
  registration,
}) => {
  return (
    <div className="p-4 bg-green-100 border border-green-400 rounded-md">
      <h2 className="text-xl font-semibold text-green-800">
        Registration Details
      </h2>
      <p>
        <strong>Category:</strong> {registration.category}
      </p>
      <p>
        <strong>Status:</strong> {registration.status}
      </p>
      <p>
        <strong>Registration Date:</strong>{" "}
        {new Date(registration.registrationDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Payment Status:</strong> {registration.paymentStatus}
      </p>
    </div>
  );
};

export default RegistrationStatus;
