CREATE TABLE IF NOT EXISTS app_user (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(80) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS consult_request (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    owner_id BIGINT NOT NULL,
    city VARCHAR(50) NOT NULL,
    area DECIMAL(10,2) NOT NULL,
    house_type VARCHAR(50),
    decoration_type VARCHAR(50),
    style VARCHAR(50),
    budget_range VARCHAR(50),
    move_in_time VARCHAR(50),
    needs VARCHAR(500),
    status VARCHAR(30) NOT NULL DEFAULT 'SUBMITTED',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_consult_owner FOREIGN KEY (owner_id) REFERENCES app_user(id)
);

CREATE TABLE IF NOT EXISTS provider_lead (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    lead_code VARCHAR(30) NOT NULL UNIQUE,
    consult_request_id BIGINT NOT NULL,
    provider_id BIGINT,
    match_score DECIMAL(5,2) NOT NULL DEFAULT 0,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    response_deadline DATETIME,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_lead_consult FOREIGN KEY (consult_request_id) REFERENCES consult_request(id),
    CONSTRAINT fk_lead_provider FOREIGN KEY (provider_id) REFERENCES app_user(id)
);

CREATE TABLE IF NOT EXISTS quote (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    quote_code VARCHAR(30) NOT NULL UNIQUE,
    lead_id BIGINT NOT NULL,
    provider_id BIGINT NOT NULL,
    total_amount DECIMAL(12,2) NOT NULL,
    validation_status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    status VARCHAR(30) NOT NULL DEFAULT 'DRAFT',
    note VARCHAR(1000),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_quote_lead FOREIGN KEY (lead_id) REFERENCES provider_lead(id),
    CONSTRAINT fk_quote_provider FOREIGN KEY (provider_id) REFERENCES app_user(id)
);

CREATE TABLE IF NOT EXISTS project_order (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_code VARCHAR(30) NOT NULL UNIQUE,
    owner_id BIGINT NOT NULL,
    provider_id BIGINT,
    quote_id BIGINT,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING_CONSULT',
    current_stage VARCHAR(50),
    progress INT NOT NULL DEFAULT 0,
    next_node_date DATE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_order_owner FOREIGN KEY (owner_id) REFERENCES app_user(id),
    CONSTRAINT fk_order_provider FOREIGN KEY (provider_id) REFERENCES app_user(id),
    CONSTRAINT fk_order_quote FOREIGN KEY (quote_id) REFERENCES quote(id)
);

CREATE INDEX idx_consult_owner ON consult_request(owner_id);
CREATE INDEX idx_lead_provider_status ON provider_lead(provider_id, status);
CREATE INDEX idx_order_status ON project_order(status);
