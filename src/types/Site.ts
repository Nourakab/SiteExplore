export interface Site {
  id: string;
  clientId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  contacts: {
    main: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      jobTitle: string;
      address: {
        zipCode: string;
        city: string;
        street: string;
        country: string;
        state: string;
      };
    };
  };
  address: {
    zipCode: string;
    city: string;
    street: string;
    country: string;
    state: string;
  };
  images: string[];
  tags: string[];
}
