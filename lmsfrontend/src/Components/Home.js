import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Home() {
  return (
    <div className="fade-in d-flex flex-column min-vh-100" style={{ background: 'transparent', paddingTop: '80px' }}>
      {/* Header / Navbar */}
      <header className="navbar py-3" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', boxShadow: '0 2px 10px rgba(0,0,0,.1)', position: 'fixed', top: 0, width: '100%', zIndex: 10 }}>
        <Container fluid className="d-flex align-items-center justify-content-between px-4">
          <div className="d-flex align-items-center">
            <div className="logo rounded-circle bg-white text-primary me-3 d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
              <i className="fas fa-graduation-cap"></i>
            </div>
            <span className="h5 mb-0 fw-bold text-white">JK LMS</span>
          </div>
          <nav className="d-flex align-items-center">
            <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
            <Link to="/register" className="btn btn-light text-dark">Register</Link>
          </nav>
        </Container>
      </header>

      {/* Hero Section */}
      <section className="container py-5">
        <Row className="align-items-center g-4" style={{ minHeight: '60vh' }}>
          <Col lg={6}>
            <h1 className="display-4 fw-bold mb-3" style={{ lineHeight: 1.05 }}>
              Unlock your potential with
              <span className="text-primary"> world-class courses.</span>
            </h1>
            <p className="lead mb-4">
              Discover a wide range of courses designed to enhance your skills and knowledge in an interactive learning environment.
            </p>
            <div className="d-flex gap-3">
              <Button variant="primary" size="lg" as={Link} to="/register">Get Started</Button>
              <Button variant="outline-primary" size="lg">Learn More</Button>
            </div>
          </Col>

          <Col lg={6} className="text-center">
            <div style={{
              width: '100%', maxWidth: 520, height: 'auto', margin: '0 auto',
              position: 'relative', display: 'inline-block'
            }}>
              <div style={{
                position: 'absolute',
                width: 360, height: 360,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                right: -40, top: -40, zIndex: 0, filter: 'blur(0.5px)', opacity: 0.3
              }} />
              <img
                src="https://blogimage.vantagecircle.com/content/images/2024/05/LMS-Dark-Feature-Image.png"
                alt="Learning"
                style={{
                  width: '100%', height: 'auto', borderRadius: '50%', objectFit: 'cover',
                  position: 'relative', zIndex: 1, boxShadow: '0 12px 28px rgba(0,0,0,.15)'
                }}
              />
            </div>
          </Col>
        </Row>
      </section>

      {/* Features Section */}
      <section className="container py-5">
        <Row className="g-4">
          {[
            {
              title: 'Diverse Courses',
              text: 'Explore a wide variety of courses designed to improve soft skills and knowledge.',
              icon: 'fas fa-book',
              to: '/allcourses'
            },
            {
              title: 'Interactive Assignments',
              text: 'Manage your assignments and track progress seamlessly.',
              icon: 'fas fa-tasks',
              to: '/assignments'
            },
            {
              title: 'Track Progress',
              text: 'Monitor your learning journey with detailed progress tracking.',
              icon: 'fas fa-chart-line',
              to: '/studentdashboard'
            }
          ].map((card, idx) => (
            <Col md={4} key={idx}>
              <Card className="h-100 text-center">
                <Card.Body>
                  <i className={`${card.icon} fa-3x text-primary mb-3`}></i>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text className="text-muted">{card.text}</Card.Text>
                  <Button variant="primary" as={Link} to={card.to}>Learn More</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* About Section */}
      <section className="container py-5" id="about">
        <div className="text-center mb-4">
          <h2 className="fw-bold">About JK LMS</h2>
        </div>
        <p className="text-center mx-auto" style={{ maxWidth: 800 }}>
          JK LMS is committed to providing high-quality courses and resources for students and teachers alike.
          We strive to create an interactive and engaging learning environment to ensure you develop the skills you need
          for success in today's competitive world.
        </p>
      </section>

      {/* Footer */}
      <footer className="text-white py-5 mt-auto" style={{ background: '#343a40', borderTop: '2px solid #ffc107' }} id="contact">
        <Container>
          <Row className="g-4">
            <Col lg={3} md={6}>
              <h5 className="fw-bold mb-3">JK LMS</h5>
              <p className="mb-3">Empowering education through innovative learning solutions. Join thousands of learners worldwide.</p>
              <div className="d-flex">
                <Button variant="warning" size="sm" className="text-dark me-2">Sign Up for Newsletters</Button>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <h5 className="fw-bold mb-3">Quick Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><Link to="/allcourses" className="text-white text-decoration-none">Courses</Link></li>
                <li className="mb-2"><Link to="/login" className="text-white text-decoration-none">Login</Link></li>
                <li className="mb-2"><Link to="/register" className="text-white text-decoration-none">Register</Link></li>
                <li className="mb-2"><a href="#about" className="text-white text-decoration-none">About Us</a></li>
              </ul>
            </Col>
            <Col lg={3} md={6}>
              <h5 className="fw-bold mb-3">Contact Us</h5>
              <div className="d-flex flex-column gap-2">
                <div><i className="fas fa-map-marker-alt me-2"></i>123 Education St, Learning City, LC 12345</div>
                <div><i className="fas fa-envelope me-2"></i><a href="mailto:contact@jklms.com" className="text-white text-decoration-none">contact@jklms.com</a></div>
                <div><i className="fas fa-phone me-2"></i>+1 800 123 4567</div>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <h5 className="fw-bold mb-3">Follow Us</h5>
              <div className="d-flex gap-3">
                <a href="https://www.facebook.com" className="text-white" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                <a href="https://www.twitter.com" className="text-white" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                <a href="https://www.linkedin.com" className="text-white" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                <a href="https://www.instagram.com" className="text-white" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              </div>
            </Col>
          </Row>
          <hr className="my-4" style={{ borderColor: 'rgba(255,255,255,.3)' }} />
          <Row className="align-items-center">
            <Col md={6}>
              <p className="mb-0">&copy; 2024 JK LMS. All rights reserved.</p>
            </Col>
            <Col md={6} className="text-md-end">
              <Link to="/privacy" className="text-white text-decoration-none me-3">Privacy Policy</Link>
              <Link to="/terms" className="text-white text-decoration-none">Terms of Service</Link>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default Home;