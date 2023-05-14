// Function to handle review data. For each review, it should return an object.
// The object should have the following structure:
// {
//   id: <review id>,
//   comment: <review comment>,
//   category_values: {
//     <category name>: <category value>,
//     ...
//   }
// }
// Each category value should be a number between 1 and 5.
function handleReviewData(reviews) {
    return reviews.map((review) => {
        const categoryValues = {};
        // There can be multiple answers for each category, so if there is more than one
        // answer for a category, we take the average of all the answers.
        review.expand.answers?.forEach((answer) => {
            const categoryId = answer.expand.question_answered?.expand.category?.id;
            const categoryName = answer.expand.question_answered?.expand.category?.name;
            if (categoryValues[categoryId] === undefined) {
                categoryValues[categoryId] = {value: 0, count: 0, name: categoryName};
            }
            categoryValues[categoryId].value += answer.answer_value.value;
            categoryValues[categoryId].count += 1;
        });
        Object.keys(categoryValues).forEach((categoryId) => {
            categoryValues[categoryId] = {
                name: categoryValues[categoryId].name,
                value: categoryValues[categoryId].value / categoryValues[categoryId].count
            };
        });
        return {
            id: review.id,
            comment: review.review_text,
            category_values: categoryValues,
        };
    });
}

function getAveragesForCourse(review_values, all_categories) {
    const categoryAverages = {};
    review_values.forEach(review => {
        for (let category in review.category_values) {
            if (!categoryAverages[category]) {
                categoryAverages[category] = {count: 0, total: 0, name: review.category_values[category].name};
            }
            categoryAverages[category].count++;
            categoryAverages[category].total += review.category_values[category].value;
        }
    });
    for (let category in categoryAverages) {
        categoryAverages[category] = {
            name: categoryAverages[category].name,
            value: categoryAverages[category].total / categoryAverages[category].count,
            count: categoryAverages[category].count
        };
    }

    // Add categories that have no reviews
    all_categories.forEach(category => {
        if (!categoryAverages[category.id]) {
            categoryAverages[category.id] = {name: category.name, value: 0, count: 0, desc: category.description};
        } else {
            categoryAverages[category.id].desc = category.description;
        }
    });

    return categoryAverages;
}

// exports
export {handleReviewData, getAveragesForCourse};