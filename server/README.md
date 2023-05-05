## SERVER JSON API
#### Send New Report
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