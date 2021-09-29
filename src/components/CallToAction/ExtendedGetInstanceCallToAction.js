import React, { useState } from 'react';
import { Button, TextField, Radio, Checkbox, TextLink as Link } from 'components';
import { createUseStyles } from 'react-jss';

import { FORM_NAMES, SCM_TOOLS } from '../../contactFormConstants';
import { currentlyExecutingGitBranch } from '../../environment';

const useStyles = createUseStyles(() => ({
  fieldset: {
    marginBottom: '2em',
  },

  radioWrapper: {
    marginBottom: '0.4em',
  },
}));

export const submitToNetlifyForms = async ({
  email,
  scmTool,
  subToNewsletter,
  netlifyFormName,
  submitButtonLabel = 'NOT_SUPPLIED',
}) => {
  const branch = currentlyExecutingGitBranch();

  const formData = new FormData();
  formData.append('form-name', netlifyFormName);
  formData.append('email', email);
  formData.append('scm', scmTool);
  formData.append('sub-to-newsletter', subToNewsletter);
  formData.append('deployed-branch', branch);
  formData.append('submit-button-label', submitButtonLabel);

  let resp;
  try {
    resp = await fetch('/', {
      method: 'POST',
      body: formData,
    });
  } catch (error) {
    console.error('Submission failed', error, resp);
  }

  return resp;
};

const ExtendedGetInstanceCallToAction = ({
  onSuccess,
  email,
  setEmail,
  scmTool,
  setScmTool,
}) => {
  const classes = useStyles();
  const [subToNewsletter, setSubToNewsletter] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const netlifyFormName = FORM_NAMES.getInstanceExtended;
  const buttonText = 'Request a trial';

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const resp = await submitToNetlifyForms({
      email,
      scmTool,
      subToNewsletter,
      netlifyFormName,
      submitButtonLabel: buttonText,
    });

    if (resp.ok) {
      // DO NOT reset the email input here. It is already happening higher in the state chain.
      onSuccess();
    } else {
      console.log('error', resp);
    }

    setSubmitting(false);
  };

  const disabled = submitting || !email || email === '';

  return (
    <form
      onSubmit={onSubmit}
      name={netlifyFormName}
      method="post"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value={netlifyFormName} />
      <input type="hidden" name="submit-button-label" value={buttonText} />
      <input type="hidden" name="deployed-branch" value={currentlyExecutingGitBranch()} />

      <div className={classes.fieldset}>
        <TextField
          label="Work email address *"
          type="email"
          name="email"
          id="get-instance-email-input"
          onChange={setEmail}
          value={email}
          fullWidth
          helpText="Your account details will be sent to this address"
        />
      </div>

      <div className={classes.fieldset}>
        <div className={classes.radioWrapper}>
          <strong>
            Primary source code hosting tool
          </strong>
        </div>

        {SCM_TOOLS.map(({ value, label }) => (
          <div className={classes.radioWrapper} key={value}>
            <Radio
              value={value}
              label={label}
              onChange={setScmTool}
              currentValue={scmTool}
              name="scm"
              id={`get-instance-scm-${value}-input`}
            />
          </div>
        ))}
      </div>

      <div className={classes.fieldset}>
        <Checkbox
          name="sub-to-newsletter"
          label="Subscribe me to the Backstage Weekly newsletter."
          checked={subToNewsletter}
          onChange={setSubToNewsletter}
          id="get-instance-sub-to-newsletter-input"
        />
      </div>

      <div className={classes.fieldset}>
        <p>By submitting this form, you automatically agree to our <Link color="primary" to="/legal-notices/evaluation-licence/">Evaluation License</Link> and acknowledge you have read our <Link color="primary" to="/legal-notices/privacy-policy/">Privacy Policy</Link>.</p>
      </div>

      <div className={classes.fieldset}>
        <Button color="primary" text={buttonText} disabled={disabled} />
      </div>
    </form>
  );
};

export default ExtendedGetInstanceCallToAction;