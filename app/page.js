'use client'
import Image from "next/image";
import getStripe from "@/utils/get-stripe"; 
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import Head from "next/head";
export default function Home() {

  const handleSubmit = async() => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: "Post",
      headers: {
        origin: 'http://localhost:3000',
      },
    })
    const checkoutSessionJson = await checkoutSession.json()
    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }
    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id
    })

    if (error) {
      console.warn(error.message)
    }
  }

  return (
    <Container maxWidth="100vw">
      <Head>
        <title>
          Flashcard SaaS
        </title>
        <meta name = "description" content="Create flashcard from your text"/>
      </Head>
      <AppBar position ="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>
          Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">
              Login
            </Button>
            <Button color="inherit" href="/sign-up">
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton/>
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box sx ={
        {
        textAlign: 'center',
        my: 4,
        }
      }>
        <Typography variant="h2">
        Welcome to Flashcard SaaS
        </Typography>
        <Typography variant = "h5">
          The best way to make flashcards from scratch
        </Typography>
        <Button variant="contained" color="primary" sx={{mt:2}}>
          Get Started
        </Button>
      </Box>
      <Box sx = {{my: 6, textAlign: "center"}}>
        <Typography variant="h4" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
        <Typography variant="h6">
          Easy Text Input
        </Typography>
        <Typography>{' '}Simply input your text</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
        <Typography variant="h6">
          Smart Flashcards
        </Typography>
        <Typography>{' '}Simply input your text</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
        <Typography variant="h6">
          Accessible Anywhere
        </Typography>
        <Typography>{' '}Simply input your text</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx = {{my:6, textAlign:'center'}}>
      <Typography variant="h4" gutterBottom>
          Pricing
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx ={{
              p: 3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
            }}>
        <Typography variant="h5" gutterBottom >
          Basic 
        </Typography>
        <Typography variant="h6" gutterBottom >
          $5 / month 
        </Typography>
        <Typography gutterBottom>{' '}Access to basic flashcard features and limited storage.</Typography>
        <Button variant = "contained" color = "primary">
          Choose basic
        </Button>
        </Box>
          </Grid>
          <Grid item xs={12} md={6}>
          <Box sx ={{
              p: 3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
            }}>
        <Typography variant="h5" gutterBottom >
          Pro 
        </Typography>
        <Typography variant="h6" gutterBottom>
          $10 / month 
        </Typography>
        <Typography gutterBottom>{' '}Unlimited flashcards and storage, with priority support.</Typography>
        <Button variant = "contained" color = "primary" onClick={handleSubmit}>
          Choose pro
        </Button>
        </Box>
        </Grid>
        </Grid>
      </Box>
      </Container>
  )
}
