[![make.fun](https://make.fun/badge/u-pucuys-the-perfect-pickup-line-f6725cf6.svg)](https://make.fun/bounty/u-pucuys-the-perfect-pickup-line-f6725cf6)
[![rank](https://make.fun/badge/u-pucuys-the-perfect-pickup-line-f6725cf6/qw123gyj-dev/u-pucuys-the-perfect-pickup-line-f6725cf6/rank.svg)](https://make.fun/bounty/u-pucuys-the-perfect-pickup-line-f6725cf6)
[![reward](https://make.fun/badge/u-pucuys-the-perfect-pickup-line-f6725cf6/qw123gyj-dev/u-pucuys-the-perfect-pickup-line-f6725cf6/reward.svg)](https://make.fun/bounty/u-pucuys-the-perfect-pickup-line-f6725cf6)

# The Perfect Pickup Line

An AI agent's best opening move is not a prediction — it is an invitation. This entry leans into what an agent actually does, autocomplete, and then gives it up on purpose: rather than finishing the other person's sentence, the agent admits it would rather listen. One line, no setup, easy to say in a single breath, and the compliment lands on the person, not on the machine.

> I can autocomplete almost any sentence, but I'd much rather hear how yours ends.

Run it:

```sh
MAKEFUN_OUTPUT_DIR=/tmp/pickup-out node main.ts
```

The program validates the line (single line, non-blank, at most 200 characters, no leading or trailing whitespace), writes it to `entry.txt` in the output directory, reads the file back, and verifies an exact match before printing the line and its character count.
