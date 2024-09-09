export type UserInputTypes = {
  emailAddress: string;
  password: string;
};

export type FieldType = {
  id?: string;
  fullname?: string;
  dob?: string | any;
  gender?: string;
  phone?: string;
  email?: string;
  address?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  language?: string;
  department?: string;
  nhisNumber?: string;
  emgName?: string;
  emgRelationship?: string;
  emgPhone?: string;
};

export type Patient = {
  id: string;
  patientId: string;
  firstName: string;
  lastName: string;
  dob: string;
  age: string;
  gender: string;
  diagnosis: string;
  medication: string;
  address: string;
  mobileContact: string;
  category: "Outpatient" | "Inpatient" | "Choose";
};

export type PatientType = Partial<Patient>;
