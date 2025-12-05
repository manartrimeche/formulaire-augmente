import { Router, Request, Response } from 'express';
import { Submission } from '../models/FormSubmission';

const router = Router();

// Get all submissions
router.get('/', async (_req: Request, res: Response) => {
  try {
    const submissions = await Submission.find().sort({ created_at: -1 });
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// Get single submission by id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const submission = await Submission.findById(id);
    
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    res.json(submission);
  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({ error: 'Failed to fetch submission' });
  }
});

// Create new submission
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      mission_type,
      first_name,
      last_name,
      email,
      phone,
      message,
      school_name,
      student_count
    } = req.body;

    // Validation
    if (!mission_type || !first_name || !last_name || !email) {
      return res.status(400).json({ 
        error: 'Missing required fields: mission_type, first_name, last_name, email' 
      });
    }

    const submission = new Submission({
      mission_type,
      first_name,
      last_name,
      email,
      phone,
      message,
      school_name,
      student_count,
    });

    await submission.save();

    res.status(201).json({ 
      message: 'Submission created successfully',
      id: submission._id,
      data: submission
    });
  } catch (error) {
    console.error('Error creating submission:', error);
    res.status(500).json({ error: 'Failed to create submission' });
  }
});

// Update submission
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const submission = await Submission.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    res.json({ 
      message: 'Submission updated successfully',
      data: submission
    });
  } catch (error) {
    console.error('Error updating submission:', error);
    res.status(500).json({ error: 'Failed to update submission' });
  }
});

// Delete submission
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const submission = await Submission.findByIdAndDelete(id);

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    res.json({ message: 'Submission deleted successfully' });
  } catch (error) {
    console.error('Error deleting submission:', error);
    res.status(500).json({ error: 'Failed to delete submission' });
  }
});

export default router;
