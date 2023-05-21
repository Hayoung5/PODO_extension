## SERVER JSON API
### Send New Report
```
ADDRESS: Valid Ethereum Address(string)
TXHASH: Valid Ethereum Transaction Hash(string)
DOMAIN: Valid Domain(string, "*.*.*")
```

#### GET `/examineTx`
Query Parameters
```json
{
    id: INTEGER,
    params: ARRAY,
}
```
Retrurn Parameters
1 or APPROVE or SETAPPROVEALL


#### POST `/report`

Query Parameters
```json
{
    address: ADDRESS,
    associatedTx: TXHASH,
    content: STRING,
    domain: DOMAIN,
    reporter: ADDRESS,
    timestamp: INT, // UNIX Timestamp
}
```

#### GET `/addressInfo`

Query Parameters
```json
{
    address: ADDRESS
}
```

Response
```json
{
    damageAmount: INT,
    reportCount: INT,
    txReportCount: INT,
    reportHistory: ARRAY(REPORT),
    risk: INT,
    isVerified: BOOL,
    isContract: BOOL,
    blacklisted: BOOL,
}
```

#### GET `/domainInfo`

Query Parameters
```json
{
    domain: DOMAIN
}
```

Response
```json
{
    reportCount: INT,
    reportHistory: ARRAY(REPORT),
    risk: INT,
    blackListed: BOOL,
    whiteListed: BOOL,
    description: STRING,
}
```

#### GET `/logs`

Query Parameters
```json
{
    reporter: ADDRESS
}
```

Response
```json
{
    reportCount: INT,
    reportHistory: ARRAY(REPORT),
}
```

### Query Risk

Risk: Whitelisted(0) / Unknown(1) / Warning(2) / Blocked(3)

#### Domain
Warning
신고가 1회 이상

Blocked
신고가 10회 이상
블랙리스트에 있는 경우

#### Address
Warning
신고가 1회 이상

Blocked
Tx 첨부 신고가 2회 이상
피해액 0.1ETH 이상
신고가 5회 이상
블랙리스트에 있는 경우

#### Contract
Warning
Verify되어 있지 않은 경우
신고가 1회 이상

Blocked
Tx 첨부 신고가 2회 이상
피해액 0.1ETH 이상
신고가 5회 이상
Verify 안 되어 있음 && 신고 3회 이상 또는 Tx 첨부 신고 1회 이상