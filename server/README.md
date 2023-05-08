## SERVER JSON API
### Send New Report
```
/report
```

Query Parameters
```json
{
    address: "0x1234",
    associatedTx: "0xabcdef12",
    content: "Description",
    domain: "a.example.com",
    reporter: "0x0987",
    timestamp: 1683210000, // UNIX Timestamp
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
신고 3회 이상 && Verify 안 되어 있음