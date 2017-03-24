# Layout

### Grid
Typical grid usage
```javascript
<Grid>
  <Row>
    <Col xs={12} sm={6} lg={4}>
      ...
    </Col>
    <Col xs={12} sm={6} lg={4}>
      ...
    </Col>
    <Col xs={12} sm={6} lg={4}>
      ...
    </Col>
  </Row>
</Grid>
```

### Offsets
Offset a column.
```javascript
<Grid>
  <Row>
    <Col xs={8} xsOffset={4} sm={6} smOffset={6} lg={12}>
      ...
    </Col>
  </Row>
</Grid>
```

### Auto Width
Add any number of auto sizing columns to a row. Let the grid figure it out.
```javascript
<Grid>
  <Row>
    <Col xs>
      ...
    </Col>
    <Col xs>
      ...
    </Col>
    <Col xs>
      ...
    </Col>
  </Row>
</Grid>
```

### Nested Grids
Nest grids inside grids inside grids.
```javascript
<Grid>
  <Row>
    <Col xs={12}>
      <Row>
        <Col xs={6}>
          <Row>
            <Col xs={4}>
              ...
            </Col>
            <Col xs={4}>
              ...
            </Col>
            <Col xs={4}>
              ...
            </Col>
          </Row>
        </Col>
        <Col xs={6}>
        <Row>
          <Col xs={6}>
            ...
          </Col>
          <Col xs={6}>
            ...
          </Col>
        </Row>
        </Col>
      </Row>
    </Col>
  </Row>
</Grid>
```
