CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    name character varying(255) NOT NULL UNIQUE,
    description TEXT,
    price bigint NOT NULL,
    topics TEXT [],
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO courses (name, price, description, topics) VALUES
('Algoritmos Avançados', 9900, 'Desenvolva o seu raciocínio lógico e aprenda a criar algoritmos computacionais com mais eficiência!', '{"Algoritmo de Dijkstra", "BackTracking", "Força Bruta", "Busca Binária"}');


CREATE TABLE form_financing (
    id SERIAL PRIMARY KEY,
    description TEXT,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO form_financing (description) VALUES
('FIES'),
('Bancario'),
('Credito estudantil');

CREATE TABLE form_payment (
    id SERIAL PRIMARY KEY,
    description TEXT,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO form_payment (description) VALUES
('Paypal'),
('Boleto'),
('Pix'),
('Visa'),
('Mastercard');

CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE customer (
    id SERIAL PRIMARY KEY,
    name character varying(255) NOT NULL,
    email citext NOT NULL,
    CPF character varying(11) NOT NULL,
    input_value bigint NOT NULL,
    id_form_financing INT,
    id_form_payment INT,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,

    CONSTRAINT fk_form_financing FOREIGN KEY(id_form_financing) REFERENCES form_financing(id),
    CONSTRAINT fk_form_payment FOREIGN KEY(id_form_payment) REFERENCES form_payment(id)
);