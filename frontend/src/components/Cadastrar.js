import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { getDeveloperById, postDeveloper, putDeveloper } from "../services";

export default function Cadastrar() {
  const history = useHistory();
  const [formValues, setFormValues] = useState({ sex: "F" });
  const { id } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if(name === 'name'){
      const valueToUpperCase = value.toUpperCase()
      setFormValues({ ...formValues, [name]: valueToUpperCase });
      return
    }
    
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if (!id) {
      const { error } = await postDeveloper(data);

      if (error) {
        alert("Erro ao Cadastrar o Desenvolvedor");
        return;
      }
    } else {
      const { error } = await putDeveloper(id, data);

      if (error) {
        alert(`Erro ao Alterar o cadastro de ${data.name}`);
        return;
      }
    }

    historyPush();
  };

  const historyPush = () => {
    history.push("/home");
  };

  const formateDate = (data) => {
    const year = new Date(data).getFullYear();
    let month = new Date(data).getMonth() + 1;
    let day = new Date(data).getDay();

    if (month.toString().length === 1) month = `0${month}`;

    if (day.toString().length === 1) day = `0${day}`;

    return `${year}-${month}-${day}`;
  };

  const updateDeveloper = async (id) => {
    const { response, error } = await getDeveloperById(id);

    if (error) {
      alert("Erro");
      return;
    }

    const data = {
      name: response.name,
      age: response.age,
      birthDate: formateDate(response.birthDate),
      sex: response.sex,
      hobby: response.hobby,
    };

    setFormValues(data);
  };

  useEffect(() => {
    id && updateDeveloper(id);
  }, []);

  return (
    <Container>
      <h1 className="text-dark my-4">
        {id ? "Alterar" : "Cadastrar"} Desenvolvedor
      </h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              name="name"
              type="text"
              value={formValues.name || ""}
              onChange={handleInputChange}
              placeholder="Digite seu nome"
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridAge">
            <Form.Label>Idade</Form.Label>
            <Form.Control
              name="age"
              type="number"
              min="0"
              value={formValues.age || ""}
              onChange={handleInputChange}
              placeholder="Digite sua idade"
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridBirthDate">
            <Form.Label>Data de Nascimento</Form.Label>
            <Form.Control
              name="birthDate"
              value={formValues.birthDate || ""}
              onChange={handleInputChange}
              type="date"
              placeholder="Digite sua data de nascimento"
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridRadio">
            <Form.Label>Sexo</Form.Label>
            <Col>
              <Form.Check
                type="radio"
                inline
                name="sex"
                label="Feminino"
                value="F"
                onChange={handleInputChange}
                checked={formValues.sex === "F"}
              />
              <Form.Check
                type="radio"
                inline
                name="sex"
                label="Masculino"
                value="M"
                onChange={handleInputChange}
                checked={formValues.sex === "M"}
              />
            </Col>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridHobby">
          <Form.Label>Hobby</Form.Label>
          <Form.Control
            as="textarea"
            name="hobby"
            required
            value={formValues.hobby || ""}
            onChange={handleInputChange}
            placeholder="Descreva seu Hobby..."
          />
        </Form.Group>

        <Col className="d-flex justify-content-end ">
          <Button
            variant="outline-danger"
            type="button"
            className="me-3"
            onClick={() => historyPush()}
          >
            Cancelar
          </Button>
          <Button variant="outline-success" type="submit">
            Enviar
          </Button>
        </Col>
      </Form>
    </Container>
  );
}
