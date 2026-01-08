'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';

const steps = ['Basic Info', 'Event Details', 'Choose Theme'];

const raceTypes = ['5K', '10K', 'Half Marathon', 'Marathon', 'Ultra'];
const themes = [
  { id: 'modern', name: 'Modern', description: 'Clean and contemporary design' },
  { id: 'classic', name: 'Classic', description: 'Traditional and elegant' },
  { id: 'vibrant', name: 'Vibrant', description: 'Bold and energetic colors' },
  { id: 'minimal', name: 'Minimal', description: 'Simple and focused' },
];

export default function NewEventPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    eventName: '',
    eventType: '',
    eventDate: '',
    location: '',
    // Step 2: Event Details
    description: '',
    distance: '',
    elevation: '',
    timeLimit: '',
    maxParticipants: '',
    registrationFee: '',
    registrationDeadline: '',
    // Step 3: Theme
    theme: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!formData.eventName) newErrors.eventName = 'Event name is required';
      if (!formData.eventType) newErrors.eventType = 'Event type is required';
      if (!formData.eventDate) newErrors.eventDate = 'Event date is required';
      if (!formData.location) newErrors.location = 'Location is required';
    } else if (step === 1) {
      if (!formData.description) newErrors.description = 'Description is required';
      if (!formData.distance) newErrors.distance = 'Distance is required';
      if (!formData.maxParticipants) newErrors.maxParticipants = 'Max participants is required';
      if (!formData.registrationFee) newErrors.registrationFee = 'Registration fee is required';
    } else if (step === 2) {
      if (!formData.theme) newErrors.theme = 'Please select a theme';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const isStepComplete = (step: number): boolean => {
    if (step === 0) {
      return !!(formData.eventName && formData.eventType && formData.eventDate && formData.location);
    } else if (step === 1) {
      return !!(
        formData.description &&
        formData.distance &&
        formData.maxParticipants &&
        formData.registrationFee
      );
    } else if (step === 2) {
      return !!formData.theme;
    }
    return false;
  };

  const allStepsComplete = isStepComplete(0) && isStepComplete(1) && isStepComplete(2);

  const handlePublish = () => {
    if (allStepsComplete) {
      // TODO: Submit form data to API
      console.log('Publishing event:', formData);
      alert('Event published successfully!');
      router.push('/dashboard');
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Event Name"
              value={formData.eventName}
              onChange={(e) => handleChange('eventName', e.target.value)}
              error={!!errors.eventName}
              helperText={errors.eventName}
              required
            />
            <FormControl fullWidth error={!!errors.eventType} required>
              <InputLabel>Event Type</InputLabel>
              <Select
                value={formData.eventType}
                onChange={(e) => handleChange('eventType', e.target.value)}
                label="Event Type"
              >
                {raceTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              {errors.eventType && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                  {errors.eventType}
                </Typography>
              )}
            </FormControl>
            <TextField
              fullWidth
              label="Event Date"
              type="date"
              value={formData.eventDate}
              onChange={(e) => handleChange('eventDate', e.target.value)}
              error={!!errors.eventDate}
              helperText={errors.eventDate}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <TextField
              fullWidth
              label="Location"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              error={!!errors.location}
              helperText={errors.location}
              placeholder="e.g., New York, NY"
              required
            />
          </Box>
        );

      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              error={!!errors.description}
              helperText={errors.description}
              placeholder="Describe your event in detail..."
              required
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Distance"
                value={formData.distance}
                onChange={(e) => handleChange('distance', e.target.value)}
                error={!!errors.distance}
                helperText={errors.distance}
                placeholder="e.g., 26.2 miles"
                required
              />
              <TextField
                fullWidth
                label="Elevation"
                value={formData.elevation}
                onChange={(e) => handleChange('elevation', e.target.value)}
                placeholder="e.g., 1,200 ft gain"
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Time Limit"
                value={formData.timeLimit}
                onChange={(e) => handleChange('timeLimit', e.target.value)}
                placeholder="e.g., 6 hours 30 minutes"
              />
              <TextField
                fullWidth
                label="Max Participants"
                type="number"
                value={formData.maxParticipants}
                onChange={(e) => handleChange('maxParticipants', e.target.value)}
                error={!!errors.maxParticipants}
                helperText={errors.maxParticipants}
                required
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Registration Fee"
                value={formData.registrationFee}
                onChange={(e) => handleChange('registrationFee', e.target.value)}
                error={!!errors.registrationFee}
                helperText={errors.registrationFee}
                placeholder="e.g., $120"
                required
              />
              <TextField
                fullWidth
                label="Registration Deadline"
                type="date"
                value={formData.registrationDeadline}
                onChange={(e) => handleChange('registrationDeadline', e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box>
            <FormControl component="fieldset" fullWidth error={!!errors.theme}>
              <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600 }}>
                Select a Theme
              </FormLabel>
              <RadioGroup
                value={formData.theme}
                onChange={(e) => handleChange('theme', e.target.value)}
              >
                <Stack spacing={2}>
                  {themes.map((theme) => (
                    <Card
                      key={theme.id}
                      sx={{
                        border: formData.theme === theme.id ? 2 : 1,
                        borderColor:
                          formData.theme === theme.id ? 'primary.main' : 'divider',
                        cursor: 'pointer',
                        '&:hover': {
                          borderColor: 'primary.main',
                        },
                      }}
                      onClick={() => handleChange('theme', theme.id)}
                    >
                      <CardContent>
                        <FormControlLabel
                          value={theme.id}
                          control={<Radio />}
                          label={
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {theme.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {theme.description}
                              </Typography>
                            </Box>
                          }
                          sx={{ m: 0, width: '100%' }}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              </RadioGroup>
              {errors.theme && (
                <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                  {errors.theme}
                </Typography>
              )}
            </FormControl>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Create New Event
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label, index) => (
          <Step key={label} completed={isStepComplete(index)}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          {renderStepContent(activeStep)}
        </CardContent>
      </Card>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          bottom: 0,
          bgcolor: 'background.paper',
          p: 2,
          borderTop: 1,
          borderColor: 'divider',
          borderRadius: 1,
        }}
      >
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
        >
          Back
        </Button>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {activeStep < steps.length - 1 ? (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              onClick={handlePublish}
              disabled={!allStepsComplete}
              sx={{ minWidth: 200 }}
            >
              Publish Event
            </Button>
          )}
        </Box>
      </Box>

      {!allStepsComplete && activeStep === steps.length - 1 && (
        <Alert severity="info" sx={{ mt: 2 }}>
          Please complete all steps to publish your event.
        </Alert>
      )}
    </Container>
  );
}
