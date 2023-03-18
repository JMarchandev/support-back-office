import { useEffect, useState } from "react";
import { getCompanyById, updateCompany } from "./controllers/companyController";
import { Company } from "./types/company";
import { Field, Form, Formik } from "formik";

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

  const handleSubmitUpdate = (data: { prompt_spec: string }) => {
    if (!companyData) return;

    const dataToUpdate = {
      prompt_spec: [...companyData.prompt_spec, data.prompt_spec],
    };

    updateCompany(companyData._id, dataToUpdate)
      .then((res) => setCompanyData(res.data))
      .catch(console.log);
  };

  const handleDeletePrompt = (spec: string) => {
    if (!companyData) return;

    const dataToUpdate = {
      prompt_spec: [...companyData.prompt_spec.filter(specList => specList !== spec)],
    };

    updateCompany(companyData._id, dataToUpdate)
      .then((res) => setCompanyData(res.data))
      .catch(console.log);
  };

  return (
    <div className="App">
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
        onSubmit={(values) => {
          handleSubmitUpdate(values);
        }}
      >
        <Form>
          <Field type="text" name="prompt_spec" id="prompt_spec" />
          <div>
            <button>Envoyer</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default App;
