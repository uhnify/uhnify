import React from 'react';
import { Container, Card } from 'react-bootstrap';

const ClubDetail = () => (
  <Container className="text-center desc-bg">

    <Card className="my-container">
      <Card.Body>
        <Card.Title>About Us</Card.Title>
        <Card.Text>
          Welcome to <strong>UHnify</strong>, the dedicated hub for connecting passionate students with vibrant campus clubs and communities!
        </Card.Text>
      </Card.Body>
    </Card>

    <Card className="my-container">
      <Card.Body>
        <Card.Title>Our Mission</Card.Title>
        <Card.Text>
          We believe that the heart of every educational institution beats
          through its clubs and organizations. They are the crossroads where
          culture thrives, interests are pursued, and lifelong friendships are
          forged. Our mission is simple yet profound: to create an accessible,
          seamless, and lively platform that not only simplifies the search for
          the perfect club but also lights the path to an enriching student life
          full of engagement and excitement.
        </Card.Text>
      </Card.Body>
    </Card>

    <Card className="my-container">
      <Card.Body>
        <Card.Title>What We Offer</Card.Title>
        <Card.Text>
          <strong>Discovery Made Simple:</strong> Gone are the days of bulletin board browsing
          or missing out on fantastic opportunities because the word didn’t
          reach you in time. Our platform offers a smart, user-friendly interface
          that allows you to discover clubs that match your interests with just
          a few clicks.
        </Card.Text>

        <Card.Text>
          <strong>Personalized Club Feeds:</strong> Customize your feed to follow the clubs you&apos;re part of or interested in. Stay updated with their latest news, events, and announcements without the fear of missing out.
        </Card.Text>
        <Card.Text>
          <strong>Event Showcases:</strong> From cultural nights to academic seminars, from spirited
          sports gatherings to creative workshops, our platform showcases an array of
          upcoming events. Plan your calendar with ease and never miss an event that
          sparks your interest.
        </Card.Text>
        <Card.Text>
          <strong>One-Stop Club Management:</strong> For club leaders, we provide a suite of tools to
          manage memberships, promote events, and engage with your audience all in one place.
          Drive up participation and enthusiasm with our intuitive club management features.
        </Card.Text>
        <Card.Text>
          <strong>Community at Your Fingertips:</strong> With a focus on fostering a vibrant student
          community, we offer a space for interaction, discussion, and collaboration. Whether
          you&apos;re a club member or just someone interested in attending, connect with
          like-minded peers and make every club event a memorable one.
        </Card.Text>
      </Card.Body>
    </Card>

    <Card className="my-container">
      <Card.Body>
        <Card.Title>Join the Movement</Card.Title>
        <Card.Text>
          At UHnify, your next adventure is just a click away. Dive into a world of clubs
          that cater to every interest under the sun, be it academic, artistic, technological,
          philanthropic, or just plain fun. Join us now and become a part of the pulsating energy
          of student life!
        </Card.Text>
        <Card.Text>
          Embark on your journey with UHnify today because every student&apos;s story deserves to be filled with chapters of unforgettable experiences!
        </Card.Text>
      </Card.Body>
    </Card>

  </Container>
);

export default ClubDetail;
