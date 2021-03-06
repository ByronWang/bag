--<ScriptOptions statementTerminator=";"/>

CREATE TABLE SYS_ATTR (
		NAME VARCHAR(60) NOT NULL,
		VALUES_NAME VARCHAR(4000),
		VALUES_REFERNAME VARCHAR(4000),
		TIMESTAMP_ TIMESTAMP
	);

CREATE TABLE SYS_USER (
		ID BIGINT NOT NULL,
		NICKNAME VARCHAR(60),
		DESCRIPTION VARCHAR(255),
		PASSWORD VARCHAR(60),
		EMAIL VARCHAR(120),
		NOTE VARCHAR(4000),
		TIMESTAMP_ TIMESTAMP,
		NAME VARCHAR(60)
	);

CREATE TABLE SYS_ACCESSLOG (
		ID BIGINT NOT NULL,
		USER_NAME VARCHAR(60),
		USERACTION VARCHAR(60),
		REMOTEADDR VARCHAR(60),
		REMOTEHOST VARCHAR(60),
		TIMESTAMP TIMESTAMP,
		TIMESTAMP_ TIMESTAMP,
		USER_ID BIGINT
	);

CREATE TABLE NPRODUCT (
		ID BIGINT NOT NULL,
		NAME VARCHAR(60),
		DESCRIPTION VARCHAR(255),
		BRAND VARCHAR(60),
		EXTENDS VARCHAR(4000),
		TIMESTAMP_ TIMESTAMP,
		IMAGE VARCHAR(60),
		COUNTRY_ID BIGINT,
		COUNTRY_NAME VARCHAR(60),
		CATEGORYLEVEL1_ID BIGINT,
		CATEGORYLEVEL1_NAME VARCHAR(60),
		CATEGORY_ID BIGINT,
		CATEGORY_NAME VARCHAR(60),
		EXPECTEDPRICE NUMERIC(10 , 2)
	);

CREATE TABLE NORDERITEMFLOW (
		ID BIGINT NOT NULL,
		ACTOR_NAME VARCHAR(60),
		ORDERITEM_ID BIGINT,
		TIMESTAMP_ TIMESTAMP,
		STATUS_ID BIGINT,
		STATUS_NAME VARCHAR(60),
		ACTOR_ID BIGINT,
		EXTENDS_PURCHASERSTARTDATETIME TIMESTAMP,
		EXTENDS_PURCHASERENDDATETIME TIMESTAMP,
		EXTENDS_INVOICEIMAGE VARCHAR(60),
		EXTENDS_PRODUCTACTUALIMAGE VARCHAR(60),
		EXTENDS_DELIVERYSTARTDATETIME TIMESTAMP,
		EXTENDS_ESTIMATEARRIVEDATETIME TIMESTAMP,
		EXTENDS_DELIVERYARRIVEDATETIME TIMESTAMP,
		EXTENDS_TRACKINGNO VARCHAR(20),
		ACTION_ID BIGINT,
		ACTION_NAME VARCHAR(60),
		EXTENDS_ACTUALPRICE NUMERIC(10 , 2)
	);

CREATE TABLE NCATEGORY (
		ID BIGINT NOT NULL,
		NAME VARCHAR(60),
		PARENT_ID BIGINT,
		PARENT_NAME VARCHAR(60),
		TIMESTAMP_ TIMESTAMP
	);

CREATE TABLE SYS_ROLE (
		ID BIGINT NOT NULL,
		NAME VARCHAR(60),
		TIMESTAMP_ TIMESTAMP
	);

CREATE TABLE SYS_MENUBAR (
		NAME VARCHAR(60) NOT NULL,
		TITLE VARCHAR(60),
		MENU_NAME VARCHAR(4000),
		MENU_ICONNAME VARCHAR(4000),
		MENU_URL VARCHAR(4000),
		TIMESTAMP_ TIMESTAMP
	);

CREATE TABLE NORDERITEM (
		ID BIGINT NOT NULL,
		PRODUCT_ID BIGINT,
		ADDRESS_PROVINCE VARCHAR(60),
		ADDRESS_CITY VARCHAR(60),
		ADDRESS_AREA VARCHAR(60),
		ADDRESS_ADDRESS VARCHAR(60),
		ADDRESS_ZIP VARCHAR(6),
		ADDRESS_CONTACT VARCHAR(60),
		ADDRESS_PHONE VARCHAR(4000),
		TIMESTAMP_ TIMESTAMP,
		ORDER_ID BIGINT,
		PRODUCT_NAME VARCHAR(60),
		PRODUCT_DESCRIPTION VARCHAR(255),
		PRODUCT_BRAND VARCHAR(60),
		PRODUCT_IMAGE VARCHAR(60),
		PRODUCT_EXTENDS VARCHAR(4000),
		BID_ID BIGINT,
		BID_PURCHASERNAME VARCHAR(60),
		BID_DEADLINE DATE,
		CUSTOMER_NAME VARCHAR(60),
		PURCHASER_NAME VARCHAR(60),
		ADDRESS_COUNTRY VARCHAR(60),
		PRODUCT_COUNTRYID BIGINT,
		PRODUCT_COUNTRYNAME VARCHAR(60),
		PRODUCT_CATEGORYLEVEL1ID BIGINT,
		PRODUCT_CATEGORYLEVEL1NAME VARCHAR(60),
		PRODUCT_CATEGORYID BIGINT,
		PRODUCT_CATEGORYNAME VARCHAR(60),
		CUSTOMER_ID BIGINT,
		PURCHASER_ID BIGINT,
		BID_PURCHASERID BIGINT,
		BID_COMMISSION NUMERIC(10 , 2),
		BID_SUGGESTEDPRICE NUMERIC(10 , 2),
		BID_DELIVERYCOST NUMERIC(10 , 2),
		PRODUCT_EXPECTEDPRICE NUMERIC(10 , 2),
		AMOUNT NUMERIC(10 , 2)
	);



CREATE TABLE NBID (
		ID BIGINT NOT NULL,
		ORDERITEM_ID BIGINT,
		PURCHASER_NAME VARCHAR(60),
		DEADLINE DATE,
		TIMESTAMP_ TIMESTAMP,
		COMMENT VARCHAR(1200),
		PURCHASER_ID BIGINT,
		DELIVERYMETHOD_ID BIGINT,
		DELIVERYMETHOD_NAME VARCHAR(60),
		COMMISSION NUMERIC(10 , 2),
		SUGGESTEDPRICE NUMERIC(10 , 2),
		DELIVERYCOST NUMERIC(10 , 2)
	);

CREATE TABLE SYS_APPLICATION (
		NAME VARCHAR(60) NOT NULL,
		THEME VARCHAR(60),
		TIMESTAMP_ TIMESTAMP
	);

CREATE TABLE NORDERSTATUS (
		ID BIGINT NOT NULL,
		NAME VARCHAR(60),
		TIMESTAMP_ TIMESTAMP
	);

CREATE TABLE NUSERROLE (
		ID BIGINT NOT NULL,
		FROMDATE DATE,
		TODATE DATE,
		USER_ID BIGINT,
		USER_NAME VARCHAR(60),
		ROLE_ID BIGINT,
		ROLE_NAME VARCHAR(60),
		TIMESTAMP_ TIMESTAMP
	);

CREATE TABLE NCOUNTRY (
		ID BIGINT NOT NULL,
		NAME VARCHAR(60),
		TIMESTAMP_ TIMESTAMP
	);


CREATE TABLE NPRODUCTKIND (
		NAME VARCHAR(60) NOT NULL,
		TIMESTAMP_ TIMESTAMP
	);
	
CREATE TABLE SYS_ICON (
		NAME VARCHAR(60) NOT NULL,
		ICONGROUP VARCHAR(60),
		TIMESTAMP_ TIMESTAMP
	);

CREATE TABLE NORDER (
		ID BIGINT NOT NULL,
		TIMESTAMP_ TIMESTAMP
	);

CREATE TABLE NACTION (
		ID BIGINT NOT NULL,
		NAME VARCHAR(60),
		TIMESTAMP_ TIMESTAMP
	);
