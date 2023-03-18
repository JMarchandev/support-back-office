import { useEffect, useState } from "react";
import { getCompanyById, updateCompany } from "./controllers/companyController";
import { Company } from "./types/company";
import { Form, Formik } from "formik";
import { Form as BForm, Button, Col, Container, Row } from "react-bootstrap";

function App() {
  const [companyData, setCompanyData] = useState<Company | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      getCompanyById("6412e8498c344711fb2116ee")
        .then((res) => {
          setCompanyData(res.data);
        })
        .catch((error) => console.log(error));
    };

    fetchCompany();
  }, []);

  const handleSubmitUpdate = (
    data: { prompt_spec: string },
    resetHandler: any
  ) => {
    if (!companyData) return;

    const dataToUpdate = {
      prompt_spec: [...companyData.prompt_spec, data.prompt_spec],
    };

    updateCompany(companyData._id, dataToUpdate)
      .then((res) => {
        setCompanyData(res.data);
        resetHandler();
      })
      .catch(console.log);
  };

  const handleDeletePrompt = (spec: string) => {
    if (!companyData) return;

    const dataToUpdate = {
      prompt_spec: [
        ...companyData.prompt_spec.filter((specList) => specList !== spec),
      ],
    };

    updateCompany(companyData._id, dataToUpdate)
      .then((res) => setCompanyData(res.data))
      .catch(console.log);
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            {companyData && (
              <>
                <h1>{companyData.name}</h1>
                {companyData.prompt_spec.map((spec, i) => (
                  <p>
                    <button onClick={() => handleDeletePrompt(spec)}>x</button>
                    {"   "}
                    {spec}
                  </p>
                ))}
              </>
            )}
            <Formik
              initialValues={{
                prompt_spec: "",
              }}
              onSubmit={(values, { resetForm }) => {
                handleSubmitUpdate(values, resetForm);
              }}
            >
              {({ handleChange, handleSubmit, values }) => {
                return (
                  <Form onSubmit={handleSubmit}>
                    <BForm.Group>
                      <BForm.Control
                        className="w-100"
                        id="prompt_spec"
                        name="prompt_spec"
                        onChange={handleChange}
                        value={values.prompt_spec}
                      >
                        {/* <Field  /> */}
                      </BForm.Control>
                    </BForm.Group>
                    <div>
                      <Button type="submit">Envoyer</Button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
