export function addedToBasketInfo(user, article) {
    return `
        <h3>Dear ${user.firstName} ${user.lastName},</h3>
        <p>You have added article ${article.name} to your basket.</p>
        <p>Best regards,</p>
        <p>Shop</p>
    `;
}