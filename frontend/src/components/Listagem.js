import React, { useEffect, useState } from "react";
import {
  Button, Col, Container, Form, Pagination, Row, Table
} from "react-bootstrap";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { deleteDeveloper, getCountDevelopers, getDeveloper } from "../services";

const Listagem = () => {
  const [listDev, setListDev] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(7);
  const [countDevelopers, setCountDevelopers] = useState(0);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setQuery(value.toUpperCase());
  };

  const formateDate = (data) => new Date(data).toLocaleDateString();

  const listDevelopers = async (data = "") => {
    const { response, error } = await getDeveloper(data, page, perPage);

    if (error) {
      alert("Erro");
      return;
    }

    setListDev(response);
    getCountDev();
  };

  const getCountDev = async () => {
    const { response, error } = await getCountDevelopers();

    if (error) {
      alert("Erro");
      return;
    }

    setCountDevelopers(response);
  };

  useEffect(() => {
    listDevelopers(query, page);
  }, [query, page]);

  const removeDeveloper = async (id) => {
    const { error } = await deleteDeveloper(id);

    if (error) {
      alert("Erro ao Excluir Cadastro! ");
      return;
    }

    listDevelopers(query);
  };

  function previous() {
    if (page > 1) setPage(page - 1);
  }

  function next() {
    if (page < countDevelopers / perPage) setPage(page + 1);
  }

  return (
    <Container>
      <Form>
        <Row>
          <Form.Group as={Col}>
            <h1 className="text-dark my-4">Listagem de Desenvolvedores</h1>{" "}
          </Form.Group>
          <Form.Group
            as={Col}
            className="mb-2 pt-4 pb-3 d-flex"
            controlId="formBasicCheckbox"
          >
            <Form.Control
              name="buscar"
              type="text"
              label="Buscar"
              placeholder="Buscar"
              value={query}
              onChange={handleInputChange}
            />
            <Button variant="dark" className="ms-3" type="submit">
              <BiSearchAlt2 />
            </Button>
          </Form.Group>
        </Row>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sexo</th>
            <th>Idade</th>
            <th>Hobby</th>
            <th>Data de Nascimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {listDev.length > 0 &&
            listDev.map((dev) => {
              return (
                <tr key={dev._id}>
                  <td>{dev.name}</td>
                  <td>{dev.sex}</td>
                  <td>{dev.age}</td>
                  <td>{dev.hobby}</td>
                  <td>{formateDate(dev.birthDate)}</td>
                  <td className="d-flex justify-content-center gap-2">
                    <Link
                      to={`/cadastrar/${dev._id}`}
                      style={{ textDecoration: "none", color: "#08f" }}
                    >
                      <Button size="sm" type="button">
                        <BsPencilSquare />
                      </Button>
                    </Link>

                    <Button
                      variant="danger"
                      type="button"
                      size="sm"
                      onClick={() => removeDeveloper(dev._id)}
                    >
                      <BsFillTrashFill />
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <Pagination className="justify-content-end">
        <Pagination.Prev onClick={() => previous()} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={() => next()} />
      </Pagination>
    </Container>
  );
};

export default Listagem;
