import React from 'react';
import { Col, Row, Card ,Button, Typography, Image  } from 'antd';
import { Container } from '@mui/system';
import { Icon } from '@mui/material';

export default function profilePage() {
  return (
    <div className="vh-100" style={{ backgroundColor: '#eee' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md="9" lg="7" xl="5" className="mt-5">
            <Card style={{ borderRadius: '15px', backgroundColor: '#93e2bb' }}>
           
                <div>
                  <Typography tag='h6'>Exquisite hand henna tattoo</Typography>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <p className="small mb-0"><Icon far icon="clock me-2" />3 hrs</p>
                    <p className="fw-bold mb-0">$90</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <div className="flex-shrink-0">
                    <Image
                      style={{ width: '70px' }}
                      className="img-fluid rounded-circle border border-dark border-3"
                      src='https://cdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-2.webp'
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <div className="d-flex flex-row align-items-center mb-2">
                      <p className="mb-0 me-2">@sheisme</p>
                      <ul className="mb-0 list-unstyled d-flex flex-row" style={{ color: '#1B7B2C' }}>
                        <li>
                          <Icon fas icon="star fa-xs" />
                        </li>
                        <li>
                          <Icon fas icon="star fa-xs" />
                        </li>
                        <li>
                          <Icon fas icon="star fa-xs" />
                        </li>
                        <li>
                          <Icon fas icon="star fa-xs" />
                        </li>
                        <li>
                          <Icon fas icon="star fa-xs" />
                        </li>
                      </ul>

                    </div>
                    <div>
                      <Button outline color="dark" rounded size="sm">+ Follow</Button>
                      <Button outline color="dark" rounded size="sm" className="mx-1">See profile</Button>
                      <Button outline color="dark" floating size="sm"><Icon fas icon="comment" /></Button>
                    </div>
                  </div>
                </div>
                <hr />
                <Button color="success" rounded block size="lg">
                  <Icon far icon="clock me-2" /> Book now
                </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}