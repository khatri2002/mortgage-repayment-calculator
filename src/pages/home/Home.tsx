import { useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import classNames from "classnames";

import { Inputs, Results } from "./types";
import { allowDecimalNumberOnly, roundOff } from "./utils";
import styles from "./Home.module.scss";
import { IconCalculator, IllustrationEmpty } from "../../assets/images";

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<Inputs>();
  const [results, setResults] = useState<Results>({
    mortgageType: null,
    monthlyPayment: null,
    totalPayments: null,
    interestPaid: null,
  });

  const onSubmit: SubmitHandler<Inputs> = async (data): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const principalAmount = Number(data.mortgageAmount);
        const termNumber = Number(data.mortgageTerm) * 12; // in months
        const rate = Number(data.interestRate) / 100 / 12; // monthly

        const monthlyPayment =
          (principalAmount * rate) / (1 - Math.pow(1 + rate, -termNumber));
        const totalPayments = monthlyPayment * termNumber;
        const interestPaid = totalPayments - principalAmount;

        setResults({
          mortgageType: data.mortgageType,
          monthlyPayment: roundOff(monthlyPayment),
          totalPayments: roundOff(totalPayments),
          interestPaid: roundOff(interestPaid),
        });
        resolve();
      }, 1500);
    });
  };

  return (
    <main className={styles.main}>
      <div className={styles.box}>
        <div className={styles.formContainer}>
          <div className={styles.header}>
            <h1 className={styles.heroText}>Mortgage Calculator</h1>
            <button onClick={() => reset()}>Clear All</button>
          </div>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.fields}>
              <div
                className={classNames({
                  [styles.field]: true,
                  [styles.error]: errors.mortgageAmount,
                })}
              >
                <label className={styles.label} htmlFor="mortgageAmount">
                  Mortgage Amount
                </label>
                <div className={styles.input}>
                  <span className={`${styles.badge} ${styles.rounded_l}`}>
                    &#163;
                  </span>
                  <input
                    id="mortgageAmount"
                    type="text"
                    {...register("mortgageAmount", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                      pattern: {
                        value: /^(?!\.$).+$/,
                        message: "Invalid amount",
                      },
                    })}
                    onInput={allowDecimalNumberOnly}
                  />
                </div>
                <span className={styles.errorText}>
                  {errors.mortgageAmount?.message}
                </span>
              </div>
              <div className={styles.flex_}>
                <div
                  className={classNames({
                    [styles.field]: true,
                    [styles.error]: errors.mortgageTerm,
                  })}
                >
                  <label className={styles.label} htmlFor="mortgageTerm">
                    Mortgage Term
                  </label>
                  <div className={styles.input}>
                    <input
                      id="mortgageTerm"
                      type="text"
                      {...register("mortgageTerm", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                        pattern: {
                          value: /^(?!\.$).+$/,
                          message: "Invalid term",
                        },
                      })}
                      onInput={allowDecimalNumberOnly}
                    />
                    <span className={`${styles.badge} ${styles.rounded_r}`}>
                      years
                    </span>
                  </div>
                  <span className={styles.errorText}>
                    {errors.mortgageTerm?.message}
                  </span>
                </div>
                <div
                  className={classNames({
                    [styles.field]: true,
                    [styles.error]: errors.interestRate,
                  })}
                >
                  <label className={styles.label} htmlFor="interestRate">
                    Interest Rate
                  </label>
                  <div className={styles.input}>
                    <input
                      id="interestRate"
                      type="text"
                      {...register("interestRate", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                        pattern: {
                          value: /^(?!\.$).+$/,
                          message: "Invalid rate",
                        },
                      })}
                      onInput={allowDecimalNumberOnly}
                    />
                    <span className={`${styles.badge} ${styles.rounded_r}`}>
                      %
                    </span>
                  </div>
                  <span className={styles.errorText}>
                    {errors.interestRate?.message}
                  </span>
                </div>
              </div>
              <div
                className={classNames({
                  [styles.field]: true,
                  [styles.error]: errors.mortgageType,
                })}
              >
                <label className={styles.label}>Mortgage Type</label>
                <div className={styles.radioInputContainer}>
                  <label className={styles.radioInput} htmlFor="repayment">
                    <input
                      type="radio"
                      id="repayment"
                      {...register("mortgageType", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      })}
                      value="repayment"
                    />
                    <span className={styles.customRadio}>
                      <span />
                    </span>
                    <span className={styles.radioName}>Repayment</span>
                  </label>
                  <label className={styles.radioInput} htmlFor="interest-only">
                    <input
                      type="radio"
                      id="interest-only"
                      {...register("mortgageType", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      })}
                      value="interest-only"
                    />
                    <span className={styles.customRadio}>
                      <span />
                    </span>
                    <span className={styles.radioName}>Interest Only</span>
                  </label>
                </div>
                <span className={styles.errorText}>
                  {errors.mortgageType?.message}
                </span>
              </div>
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className={styles.btn}
            >
              <img src={IconCalculator} alt="icon-calculator" />
              Calculate Repayments
            </button>
          </form>
        </div>
        <div className={styles.resultContainer}>
          <div
            className={classNames({
              [styles.emptyResult]: true,
              [styles.hide]: !isSubmitting && isSubmitSuccessful,
            })}
          >
            <img src={IllustrationEmpty} alt="illustration-empty" />
            <span className={styles.title}>Results shown here</span>
            <span className={styles.desc}>
              Complete the form and click “calculate repayments” to see what
              your monthly repayments would be.
            </span>
          </div>
          <div
            className={classNames({
              [styles.completedResult]: true,
              [styles.show]: !isSubmitting && isSubmitSuccessful,
            })}
          >
            <span className={styles.title}>Your results</span>
            <span className={styles.desc}>
              Your results are shown below based on the information you
              provided. To adjust the results, edit the form and click
              "calculate repayments" again.
            </span>
            <div className={styles.resultBox}>
              <span className={styles.key}>
                {results.mortgageType === "repayment"
                  ? "Your monthly repayments"
                  : "Your interest payment"}
              </span>
              <span className={styles.heroValue}>
                &#163;
                {results.mortgageType === "repayment"
                  ? `${results.monthlyPayment}`
                  : `${results.interestPaid}`}
              </span>
              {results.mortgageType === "repayment" && (
                <>
                  <hr className={styles.line} />
                  <span className={styles.key}>
                    Total you'll repay over the term
                  </span>
                  <span className={styles.subValue}>
                    &#163;{`${results.totalPayments}`}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
